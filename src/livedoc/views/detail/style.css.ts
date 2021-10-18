import { themed } from '../../../theming/DarkTheme';

const css = (strings: TemplateStringsArray, ...expr: string[]) => {
  let str = '';
  strings.forEach((string, i) => {
    str += string + (expr[i] || '');
  });
  return str;
};

export const cssStyle = themed(
  ({
    text,
    hover,
    dimmed,
    inactive,
    disabled,
    success,
    main,
    info,
    background: {
      mainCloser,
      mainMiddle,
      mainFar,
      mainFurther,
      mainFurthest,
      error,
    },
  }) => {
    return css`
      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        box-sizing: inherit;
      }

      a {
        cursor: pointer;
        color: inherit;
        text-decoration: none;
        transition: 170ms ease-in-out;
      }

      ul {
        margin: 0;
        padding-left: 0;
        list-style: none;
      }

      img {
        display: block;
        max-width: 100%;
      }
      .InvalidSchema {
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: center;
      }
      .InvalidSchema .Bubble {
        font-size: 1rem;
        color: ${error};
        background: ${mainMiddle};
        padding: 2rem 4rem;
        border-radius: 5px;
      }
      .EditorDocumentationContainer {
        background: ${mainFar};
        flex: 1;
        height: 100%;
        display: flex;
        font-family: inherit;
      }
      .Docs-p,
      .Docs-h1,
      .Docs-h2,
      .Docs-h3,
      .Docs-h4,
      .Docs-h5 {
        margin: 0;
      }

      .Docs-p {
        color: ${text};
        font-weight: 300;
      }

      .Docs-p + .Docs-h2 {
        margin-top: 2.875rem;
      }

      .Docs-h1 {
        font-size: 1.75rem;
        font-weight: bold;
        line-height: 1.16;
        color: ${hover};
      }

      .Docs-h2 {
        font-size: 1.5rem;
        margin: 0 0 1rem 0;
      }

      .Docs-h3 {
        color: ${dimmed};
        font-size: 1.25rem;
        font-weight: bold;
        line-height: 1.18;
        margin: 0 0 1.125rem 0;
      }

      .Docs-h4 {
        font-size: 0.75rem;
        margin: 0 0 0.5rem 0;
        color: ${inactive};
        text-transform: uppercase;
      }

      .Docs-h5 {
        font-size: 0.75rem;
      }

      .Menu {
        position: absolute;
        min-width: 12.5rem;
        width: 100%;
        max-height: 100%;
        order: 0;
        background: ${mainFurther};
        word-break: break-all;
        padding-bottom: 2rem;
        box-shadow: 0.25rem 0.25rem 1rem rgba(0, 0, 0, 0.25);
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        transform: translateX(-100%);
        transition: transform 350ms ease-in-out 0s;
        z-index: 1;
      }

      .MenuHeader {
        color: ${text};
      }

      .Menu.ShowToggle {
        transform: translateX(0);
      }

      .Menu,
      .__Type {
        scrollbar-color: ${mainMiddle} ${mainFurthest};
      }

      .Menu::-webkit-scrollbar,
      .__Type::-webkit-scrollbar {
        background: ${mainFurthest};
      }

      .Menu::-webkit-scrollbar-track,
      .__Type::-webkit-scrollbar-track {
        background: ${mainFurthest};
      }

      .Menu::-webkit-scrollbar-thumb,
      .__Type::-webkit-scrollbar-thumb {
        background: ${mainCloser};
      }

      .Menu .MenuHeader {
        padding: 1.25rem;
        display: flex;
        align-items: center;
      }

      .Menu .MenuSection {
        padding: 1.25rem 1.25rem 0.625rem 1.25rem;
      }

      .Menu .MenuSection:not(:last-child) {
        border-bottom: 1px solid ${mainMiddle};
      }

      .Menu .Logo {
        width: 100%;
        max-width: 10.25rem;
      }

      .Link {
        position: relative;
        display: block;
        font-size: 0.875rem;
        line-height: 2.3;
        color: ${dimmed};
      }

      .Link:hover {
        color: ${success};
      }

      .Link.Active::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 0.1875rem;
        height: 100%;
        background: ${success};
      }

      .Link.Active {
        font-weight: bold;
        color: ${success};
        padding-left: 0.625rem;
      }

      .__Type {
        order: 1;
        flex: 1;
        display: flex;
        flex-flow: column nowrap;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        margin-top: 2.5rem;
      }

      .__Type-inner {
        padding: 0 1.25rem 1rem 1.25rem;
      }

      .__Type-kind {
        order: 2;
        font-size: 0.875rem;
        margin-bottom: 1.25rem;
        color: ${success};
        font-weight: bold;
      }

      .__Type-kind + .__Type-description {
        margin-top: 2.875rem;
      }

      .__Type-name {
        order: 1;
        font-size: 1.75rem;
        font-weight: bold;
        line-height: 1.16;
        color: ${dimmed};
        margin-bottom: 0.125rem;
      }

      .__Type-description {
        order: 3;
        color: ${dimmed};
        font-weight: 300;
        margin-bottom: 2rem;
      }

      .__Type-fields {
        order: 4;
      }

      .__Type-possibleTypes {
        order: 5;
      }

      .__Type-fields,
      .__Type-possibleTypes {
        margin-bottom: 2.875rem;
      }

      .Field {
        width: 100%;
        padding: 1rem;
        background: ${mainFurther};
        border-radius: 5px;
      }

      .Field:not(:last-child) {
        margin-bottom: 0.75rem;
      }

      .FieldParams {
        display: flex;
        margin-bottom: 0.25rem;
      }

      .FieldType {
        color: ${info};
        font-weight: bold;
      }

      .FieldArgs {
        margin-right: 0.1875rem;
      }

      .FieldName {
        display: block;
        font-weight: bold;
        margin-right: 0.1875rem;
        color: ${text};
      }

      .FieldName:not(:first-child) {
        margin-top: 0.5rem;
      }

      .FieldName--field {
        color: ${text};
      }

      .FieldName--enum {
        color: ${hover};
      }

      .FieldName--unionType {
        color: ${success};
      }

      a.FieldName:hover,
      a.FieldType:hover {
        color: ${text};
      }

      .ArgumentName {
        margin-right: 0.1875rem;
      }

      .FieldDescription {
        color: ${dimmed};
        font-weight: 300;
      }

      strong {
        font-weight: bold;
      }

      .TableOfContents {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 2.5rem;
      }

      .TableOfContentsLink {
        position: relative;
        display: inline-flex;
        color: ${info};
        font-weight: bold;
        margin-bottom: 0.5rem;
        margin-left: 0.875rem;
      }

      .TableOfContentsLink:hover .FieldName {
        text-decoration: underline;
      }

      burger-menu {
        position: absolute;
        top: 0.75rem;
        right: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 1.5rem;
        height: 1.5rem;
        cursor: pointer;
        z-index: 10;
        background: transparent;
      }

      burger-bar {
        width: 1.5rem;
        height: 0.1875rem;
        position: relative;
        transform-origin: 1px center;
        background: ${main};
        transition: width 0.17s ease, transform 0.3s ease-in-out,
          background 0.27s;
      }

      burger-menu:hover burger-bar {
        background: ${hover};
      }

      burger-bar:first-child {
        transform: rotate(0deg);
      }

      burger-bar:nth-child(2) {
        width: 1.5rem;
      }

      burger-bar:last-child {
        transform: rotate(0deg);
      }

      burger-menu.ShowToggle burger-bar:first-child {
        transform: rotate(45deg);
      }

      burger-menu.ShowToggle burger-bar:nth-child(2) {
        width: 0;
      }

      burger-menu.ShowToggle burger-bar:last-child {
        transform: rotate(-45deg);
      }

      @media (min-width: 768px) {
        .__Type {
          margin-top: 0;
        }
        .__Type-inner {
          padding-top: 2.5rem;
          min-width: 18.75rem;
        }
        .Menu {
          transform: translateX(0);
          width: 100%;
          max-width: 13.75rem;
          position: relative;
          transition: none;
        }
        .Menu .Logo {
          margin: auto;
        }
        .TableOfContents {
          margin-bottom: 2.875rem;
        }
        burger-menu {
          display: none;
        }
      }

      @media (min-width: 1050px) {
        .Docs-h1 {
          font-size: 1.875rem;
        }
        .Docs-h3 {
          font-size: 1.375rem;
        }
        .Menu .MenuHeader {
          padding: 1.875rem 1.875rem 2.25rem 1.875rem;
        }
        .Menu .MenuSection {
          padding-left: 1.875rem;
          padding-right: 1.875rem;
        }
        .__Type-inner {
          padding: 4.75rem 1.875rem 4rem 1.875rem;
        }
        .__Type-description {
          margin-bottom: 3rem;
        }
        .__Type-name {
          font-size: 1.875rem;
        }
      }
    `;
  },
);
