import {
  ParserField,
  TypeSystemDefinition,
  ValueDefinition,
} from 'graphql-zeus';
// @ts-ignore
import { Remarkable } from 'remarkable';
// @ts-ignore
const md = new Remarkable();
const renderLinking = (to: string, isStatic?: boolean) =>
  isStatic ? `href="${to}.html"` : `onclick="route('${to}')"`;

const renderLinkingHome = (isStatic?: boolean) =>
  isStatic ? `href="index.html"` : `onclick="route()"`;
const typeLinks = (
  types: string[],
  title: string,
  active?: string,
  isStatic?: boolean,
) => {
  return `
  <div class="MenuTypes">
      <h4 class="Docs-h4">${title}</h4>
      ${types
        .map(
          (t) =>
            `<a id="Docs-${t}" ${renderLinking(t, isStatic)} class="Link ${
              t === active ? 'Active' : ''
            }" >${t}</a>`,
        )
        .join('')}
  </div>
  `;
};

const MenuCategory = (
  types: string[],
  title: string,
  active?: string,
  isStatic?: boolean,
) => {
  return `
  <div class="MenuSection">
    ${typeLinks(types, title, active, isStatic)}
  </div>
  `;
};
//@ts-ignore
window.scrollDocs = (name) => {
  const element = document.getElementById(name);
  //@ts-ignore
  document.getElementById('__Type').scrollTo({
    behavior: 'smooth',
    //@ts-ignore
    top: element.offsetTop,
  });
};
//@ts-ignore
window.toggleMenu = () => {
  const burgerMenu = document.getElementById('BurgerMenu');
  const menuElement = document.getElementById('Menu');
  //@ts-ignore
  const burgerNextToggle = burgerMenu.classList.contains('ShowToggle');
  //@ts-ignore
  const menuNextToggle = menuElement.classList.contains('ShowToggle');
  if (menuNextToggle && burgerNextToggle) {
    //@ts-ignore
    burgerMenu.classList.remove('ShowToggle');
    //@ts-ignore
    menuElement.classList.remove('ShowToggle');
  } else {
    //@ts-ignore
    burgerMenu.classList.add('ShowToggle');
    //@ts-ignore
    menuElement.classList.add('ShowToggle');
  }
};

const RenderFieldTOC = (field: ParserField) => {
  const argsRender =
    field.args && field.args.length > 0
      ? `(${field.args
          .map((a) => {
            return `<span class="ArgumentName">${a.name}:</span><span class="FieldType">${field.type.name}</span>`;
          })
          .join(', ')})`
      : '';
  return `
     <a class="TableOfContentsLink" onclick="scrollDocs('${field.name}')"><span class="FieldName">${field.name}:</span> <span class="FieldArgs">${argsRender}</span> <span class="FieldType">${field.type.name}</span></a>
  `;
};

const RenderField = (field: ParserField, isStatic?: boolean) => {
  const argsRender =
    field.args && field.args.length > 0
      ? `(${field.args
          .map((a) => {
            return `<span class="ArgumentName">${
              a.name
            }:</span><a ${renderLinking(
              a.type.name,
              isStatic,
            )}  class="FieldType" >${a.type.name}</span>`;
          })
          .join(', ')})`
      : '';
  return `
  <div class="Field">
      <div class="FieldParams">
          <div id="${field.name}" class="FieldName FieldName--field">${
    field.name
  }${argsRender}</div>
          <a ${renderLinking(field.type.name, isStatic)} class="FieldType">${
    field.type.name
  }</a>
      </div>
     ${
       field.description
         ? `<div class="FieldDescription">${field.description}</div>`
         : ''
     }
  </div>
  `;
};

const RenderPossibleTypes = (types: ParserField[], isStatic?: boolean) => `
<div class="__Type-possibleTypes">
    <h3 class="Docs-h3">Possible Types</h3>
    <div class="Fields">
        ${types
          .map((field: { name: any }) => {
            return `
            <a ${renderLinking(
              field.name,
              isStatic,
            )} class="FieldName FieldName--unionType">${field.name}</a>
            `;
          })
          .join('')}
    </div>
</div>
`;

const RenderEnums = (enums: ParserField[]) => `
    <div class="__Type-fields">
        <h3 class="Docs-h3">Enum Values</h3>
        <div class="Fields">
          ${enums
            .map((field) => {
              return `
              <div class="Field">
                  <div class="FieldParams">
                      <div class="FieldName FieldName--enum">${field.name}</div>
                  </div>
                  ${
                    field.description
                      ? `<div class="FieldDescription">${field.description}</div>`
                      : ''
                  }
              </div>
            `;
            })
            .join('')}
        </div>`;

const RenderFields = (fields: ParserField[], isStatic?: boolean) => `
    <div class="__Type-fields">
        <h3 class="Docs-h3">Table of Contents</h3>
        <div class="TableOfContents">
        ${fields
          .map((field) => {
            return RenderFieldTOC(field);
          })
          .join('')}
        </div>
        <h3 class="Docs-h3">Fields</h3>
        <div class="Fields">
            ${fields.map((f) => RenderField(f, isStatic)).join('')}
        </div>
    </div>
`;

export const RenderSideBar = ({
  types,
  directives,
  enums,
  inputs,
  interfaces,
  scalars,
  unions,
  schema,
  active,
  isStatic,
  logo,
}: {
  types: string[];
  interfaces: string[];
  unions: string[];
  inputs: string[];
  enums: string[];
  scalars: string[];
  directives: string[];
  schema: string[];
  active?: string;
  isStatic?: boolean;
  logo?: string;
}) => {
  return `
            <div class="Menu" id="Menu">
                <a class="MenuHeader" ${renderLinkingHome(isStatic)}>
                    ${logo ? `<img class="Logo" src="${logo}" />` : `Docs`}
                </a>
                <div class="MenuSection">
                    ${typeLinks(schema, 'Schema', active, isStatic)}
                </div>
                ${MenuCategory(types, 'Types', active, isStatic)}
                ${MenuCategory(interfaces, 'Interfaces', active, isStatic)}
                ${MenuCategory(unions, 'Unions', active, isStatic)}
                ${MenuCategory(inputs, 'Inputs', active, isStatic)}
                ${MenuCategory(enums, 'Enums', active, isStatic)}
                ${MenuCategory(scalars, 'Scalars', active, isStatic)}
                ${MenuCategory(directives, 'Directives', active, isStatic)}
            </div>
            <burger-menu id="BurgerMenu" onClick="toggleMenu()">
              <burger-bar></burger-bar>
              <burger-bar></burger-bar>
              <burger-bar></burger-bar>
            </burger-menu>
            `;
};
export const RenderType = ({
  isStatic,
  value,
}: {
  isStatic?: boolean;
  value: ParserField;
}) => {
  const { description, name, type, args } = value;
  const fields = args?.filter(
    (a) => a.data.type === TypeSystemDefinition.FieldDefinition,
  );
  const inputFields = args?.filter(
    (a) => a.data.type === ValueDefinition.InputValueDefinition,
  );
  const enumValues = args?.filter(
    (a) => a.data.type === ValueDefinition.EnumValueDefinition,
  );
  const unionTypes = args?.filter(
    (a) => a.data.type === TypeSystemDefinition.UnionMemberDefinition,
  );
  return `
        <div class="__Type" id="__Type">
          <div class="__Type-inner">
            <div class="__Type-name">${name}</div>
            <div class="__Type-kind">${type.name}</div>
            <div class="__Type-description">${
              !!description?.length ? md.render(description) : ''
            }</div>
            ${!!fields?.length ? RenderFields(fields, isStatic) : ''} 
            ${!!inputFields?.length ? RenderFields(inputFields, isStatic) : ''} 
            ${!!enumValues?.length ? RenderEnums(enumValues) : ''} 
            ${
              !!unionTypes?.length
                ? RenderPossibleTypes(unionTypes, isStatic)
                : ''
            } 
          </div>
        </div>
      `;
};
