import React, { useState, useEffect, useLayoutEffect } from 'react';
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
import {
  BooleanNode,
  FloatNode,
  IDNode,
  IntNode,
  StringNode,
} from '../builtInNodes';
export interface LiveDocProps {
  schema: string;
  css?: string;
  active?: string;
  isStatic?: boolean;
  logo?: string;
}
export interface LiveDocExportProps {
  schema: string;
  css?: string;
  name?: string;
  logo?: string;
}

let currentScroll: number;

const builtInScalars = [BooleanNode, FloatNode, IDNode, IntNode, StringNode];

export const LiveDocMain = ({
  schema,
  active,
  isStatic,
  logo,
}: LiveDocProps) => {
  const tree = Parser.parse(schema);
  const nodes = tree.nodes.concat(builtInScalars);
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
  return `<div class="EditorDocumentationContainer">${RenderSideBar({
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
    logo,
  }) + typeRender}</div>`;
};
export const LiveDoc = ({
  schema,
  css = DetailView.css,
  logo = 'https://graphqleditor.com/static/logoText-4ce01b90dc0eba15154a66bdee8f67d6.png',
}: LiveDocProps) => {
  const [currentType, setCurrentType] = useState<string>();

  const tree = Parser.parse(schema);
  const queryType = tree.nodes.find((n) =>
    n.type.operations?.includes(OperationType.query),
  );

  useEffect(() => {
    //@ts-ignore
    window.route = (typeName: string) => {
      const menuElement = document.getElementById('Menu');
      if (!menuElement?.parentElement) {
        throw new Error('No Menu element');
      }
      const element = document.getElementById(`Docs-${typeName}`);
      const rect = element?.getBoundingClientRect();
      if (
        rect &&
        rect.y > 0 &&
        rect.y < menuElement.parentElement.clientHeight
      ) {
        //keep scroll
        currentScroll = menuElement.scrollTop;
      } else {
        currentScroll = -1;
      }
      setCurrentType(typeName);
    };
  }, []);
  useLayoutEffect(() => {
    const menuElement = document.getElementById('Menu');
    if (currentScroll !== -1) {
      menuElement?.scrollTo({ top: currentScroll });
    }
    if (!menuElement?.parentElement) {
      throw new Error('No Menu element');
    }
    // const currentScroll = menuElement.scrollTop;
    // const { height } = menuElement.parentElement!.getBoundingClientRect();
    const element = document.getElementById(`Docs-${currentType}`);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.y > menuElement.parentElement.clientHeight) {
        menuElement.scrollTo({
          behavior: 'auto',
          top: rect.y,
        });
      }
    }
  }, [currentType]);
  return (
    <>
      <div
        style={{
          height: '100%',
        }}
        dangerouslySetInnerHTML={{
          __html: LiveDocMain({ schema, logo, active: currentType }),
        }}
      />
      <style>{queryType ? CssReplace(css, queryType.name) : css}</style>
    </>
  );
};

export const LiveDocHtml = async ({
  schema,
  css = DetailView.css,
  name = 'graphql-editor',
  logo = 'https://graphqleditor.com/static/logoText-4ce01b90dc0eba15154a66bdee8f67d6.png',
}: LiveDocExportProps) => {
  const tree = await Parser.parse(schema);
  const z = new zip();
  const types = z.folder('docs');
  if (!types) {
    throw new Error('Cannot init jszip');
  }
  const queryType = tree.nodes.find((n) =>
    n.type.operations?.includes(OperationType.query),
  );
  const cssResult = queryType ? CssReplace(css, queryType.name) : css;
  await types.file(
    `index.html`,
    DocSkeletonStatic({
      body: LiveDocMain({ schema, isStatic: true }),
    }),
  );
  for (const at of tree.nodes.concat(builtInScalars)) {
    const html = LiveDocMain({ schema, active: at.name, logo, isStatic: true });
    const all = DocSkeletonStatic({
      body: html,
      startingType: at.name,
    });
    await types.file(`${at.name}.html`, all);
  }
  await types.file(`styles.css`, cssResult);
  const zipFile = await z.generateAsync({ type: 'blob' });
  saveAs(zipFile, `${name}.zip`);
};
