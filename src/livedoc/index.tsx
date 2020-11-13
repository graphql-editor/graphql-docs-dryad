import React, { useState, useEffect } from 'react';
import DetailView from './views/detail';
import zip from 'jszip';
import { saveAs } from 'file-saver';
import { CssReplace } from './CssReplace';
import { DocSkeletonStatic } from './DocSkeleton';
import {
  AllTypes,
  OperationType,
  Parser,
  TypeDefinition,
  TypeSystemDefinition,
} from 'graphql-zeus';
import { RenderSideBar, RenderType } from './views/detail/html';
import { Colors } from '../Colors';
import {
  BooleanNode,
  FloatNode,
  IDNode,
  IntNode,
  StringNode,
} from '../builtInNodes';
export interface LiveDocProps {
  schema: string;
  active?: string;
  isStatic?: boolean;
}
export interface LiveDocExportProps {
  schema: string;
  name?: string;
}

export const LiveDocMain = ({ schema, active, isStatic }: LiveDocProps) => {
  const tree = Parser.parse(schema);
  const nodes = tree.nodes.concat([
    BooleanNode,
    FloatNode,
    IDNode,
    IntNode,
    StringNode,
  ]);
  const getNodesByType = (t: AllTypes) => {
    return nodes.filter((n) => n.data.type === t);
  };
  const queryType = nodes.filter((n) =>
    n.type.operations?.includes(OperationType.query),
  );
  const mutationType = nodes.filter((n) =>
    n.type.operations?.includes(OperationType.mutation),
  );
  const subscriptionType = nodes.filter((n) =>
    n.type.operations?.includes(OperationType.subscription),
  );
  const schemaTypes = queryType.concat(mutationType).concat(subscriptionType);
  const types = getNodesByType(TypeDefinition.ObjectTypeDefinition).filter(
    (n) => !n.type.operations?.length,
  );
  const interfaces = getNodesByType(TypeDefinition.InterfaceTypeDefinition);
  const unions = getNodesByType(TypeDefinition.UnionTypeDefinition);
  const scalars = getNodesByType(TypeDefinition.ScalarTypeDefinition);
  const enums = getNodesByType(TypeDefinition.EnumTypeDefinition);
  const inputs = getNodesByType(TypeDefinition.InputObjectTypeDefinition);
  const directives = getNodesByType(TypeSystemDefinition.DirectiveDefinition);
  const typeRender = active
    ? RenderType({
        isStatic,
        value: nodes.find((n) => n.name === active)!,
      })
    : '';
  return (
    RenderSideBar({
      active,
      schema: schemaTypes.map((st) => st.name),
      scalars: scalars.map((n) => n.name),
      interfaces: interfaces.map((n) => n.name),
      types: types.map((n) => n.name),
      unions: unions.map((n) => n.name),
      inputs: inputs.map((n) => n.name),
      enums: enums.map((n) => n.name),
      directives: directives.map((n) => n.name),
      isStatic,
    }) + typeRender
  );
};
export const LiveDoc = ({ schema }: LiveDocProps) => {
  const [currentType, setCurrentType] = useState<string>();

  const tree = Parser.parse(schema);
  const queryType = tree.nodes.find((n) =>
    n.type.operations?.includes(OperationType.query),
  );

  useEffect(() => {
    //@ts-ignore
    window.route = (typeName: string) => {
      const currentScroll = document.getElementById('Menu')?.scrollTop || 0;
      setCurrentType(typeName);
      document.getElementById('Menu')?.scrollTo({
        top: currentScroll,
      });
    };
  }, []);
  return (
    <>
      <div
        style={{
          display: 'flex',
          background: Colors.main[10],
          height: '100%',
        }}
        dangerouslySetInnerHTML={{
          __html: LiveDocMain({ schema, active: currentType }),
        }}
      />
      <style>
        {queryType
          ? CssReplace(DetailView.css, queryType.name)
          : DetailView.css}
      </style>
    </>
  );
};

export const LiveDocHtml = async ({
  schema,
  name = 'graphql-editor',
}: LiveDocExportProps) => {
  const tree = await Parser.parse(schema);
  const z = new zip();
  const types = z.folder('docs');
  const queryType = tree.nodes.find((n) =>
    n.type.operations?.includes(OperationType.query),
  );
  await types?.file(
    `index.html`,
    DocSkeletonStatic({
      body: LiveDocMain({ schema, isStatic: true }),
      style: queryType ? CssReplace(DetailView.css, queryType.name) : '',
    }),
  );
  for (const at of tree.nodes) {
    const html = LiveDocMain({ schema, active: at.name, isStatic: true });
    const all = DocSkeletonStatic({
      body: html,
      style: queryType ? CssReplace(DetailView.css, queryType.name) : '',
    });
    await types?.file(`${at.name}.html`, all);
  }
  const zipFile = await z.generateAsync({ type: 'blob' });
  saveAs(zipFile, `${name}.zip`);
};
