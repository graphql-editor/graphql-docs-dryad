export const css = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
    :root {
        --pink100: #FF59C5;
        --grey0:#F3F3F4;
        --grey1:#E5E5E5;
        --grey2:#CCCCCC;
        --grey3:#B2B2B2;
        --grey4:#999999;
        --grey5:#808080;
        --grey6:#666666;
        --grey7:#4D4D4D;
        --grey8:#333333;
        --grey9:#1A1A1A;
        --grey95:#0d0d0d;
        --grey10:#000000;
        --main0:#d966ff;
        --main1:#c45ce6;
        --main2:#b053cd;
        --main3:#9b49b3;
        --main4:#873f9a;
        --main5:#723681;
        --main6:#5d2c68;
        --main7:#49224f;
        --main8:#341835;
        --main85:#200f1c;
        --main9:#0b050d;
        --main95:#060307;
       --green0:#acf7c1;
        --green1:#9ce0af;
        --green2:#8cc99d;
        --green3:#7bb18b;
        --green4:#6b9a79;
        --green5:#5b8367;
        --green6:#4b6c54;
        --yellow0:#cfee9e;
        --yellow1:#bcd88f;
        --yellow2:#a8c180;
        --yellow3:#95ab72;
        --yellow4:#819563;
        --yellow5:#6e7f54;
        --yellow6:#5b6845;
        --red0:#de3c4b;
        --red1:#c93644;
        --red2:#b5313d;
        --red3:#a02b36;
        --red4:#8b262f;
        --red5:#772028;
        --red6:#621a21;
        --blue0:#17bebb;
        --blue1:#15adaa;
        --blue2:#139c99;
        --blue3:#118b89;
        --blue4:#0f7a78;
        --blue5:#0d6967;
        --blue6:#0a5756;
        --blue7:#084645;
        --top-bar-height:50px;

        --light: 300;
        --normal: 400;
        --bold: 700;
       }

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

    .Docs-p,
    .Docs-h1,
    .Docs-h2,
    .Docs-h3,
    .Docs-h4,
    .Docs-h5 {
        margin: 0;
    }

    .Docs-p {
        color: var(--grey3);
        font-weight: var(--light);
    }

    .Docs-p+.Docs-h2 {
        margin-top: 2.875rem;
    }

    .Docs-h1 {
        font-size: 1.75rem;
        font-weight: var(--bold);
        line-height: 1.16;
        color: var(--grey3);
    }

    .Docs-h2 {
        font-size: 1.5rem;
        margin: 0 0 1rem 0;
    }

    .Docs-h3 {
        color: var(--grey3);
        font-size: 1.25rem;
        font-weight: var(--bold);
        line-height: 1.18;
        margin: 0 0 1.125rem 0;
    }

    .Docs-h4 {
        font-size: 0.75rem;
        margin: 0 0 0.5rem 0;
        color: var(--grey6);
        text-transform: uppercase;
    }

    .Docs-h5 {
        font-size: 0.75rem;
    }

    .Query {
        position: relative;
        display: flex;
        flex-direction: column;
        background: var(--main9);
        font-family: "Roboto", sans-serif;
        font-size: 16px;
        font-weight: var(--normal);
        line-height: 1.5;
        color: var(--grey0);
        height: 100%;
        overflow: hidden;
    }

    .Menu {
        position: absolute;
        min-width: 12.5rem;
        width: 100%;
        max-height: 100%;
        order: 0;
        background: var(--main9);
        word-break: break-all;
        padding-bottom: 2rem;
        box-shadow: 0.25rem 0.25rem 1rem rgba(0, 0, 0, 0.25);
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        transform: translateX(-100%);
        transition: transform 350ms ease-in-out 0s;
        z-index: 1;
    }

    .Menu.ShowToggle {
        transform: translateX(0);
    }

    .Menu,
    .Query,
    .__Type {
        scrollbar-color: var(--main85) var(--main9);
    }

    .Menu::-webkit-scrollbar,
    .Query::-webkit-scrollbar,
    .__Type::-webkit-scrollbar {
        background: var(--main9);
    }

    .Menu::-webkit-scrollbar-track,
    .Query::-webkit-scrollbar-track,
    .__Type::-webkit-scrollbar-track {
        background: var(--main9);
    }

    .Menu::-webkit-scrollbar-thumb,
    .Query::-webkit-scrollbar-thumb,
    .__Type::-webkit-scrollbar-thumb {
        background: var(--main85);
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
        border-bottom: 1px solid var(--grey9);
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
        color: var(--grey1);
    }

    .Link:hover {
        color: var(--green0);
    }

    .Link.Active::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 0.1875rem;
        height: 100%;
        background: var(--green0);
    }

    .Link.Active {
        font-weight: var(--bold);
        color: var(--main0);
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
        color: var(--green0);
        font-weight: var(--bold);
    }

    .__Type-kind+.__Type-description {
        margin-top: 2.875rem;
    }

    .__Type-name {
        order: 1;
        font-size: 1.75rem;
        font-weight: var(--bold);
        line-height: 1.16;
        color: var(--grey3);
        margin-bottom: 0.125rem;
    }

    .__Type-description {
        order: 3;
        color: var(--grey3);
        font-weight: var(--light);
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
        background: var(--main85);
        border-radius:5px;
    }

    .Field:not(:last-child) {
        margin-bottom: 0.75rem;
    }

    .FieldParams {
        display: flex;
        margin-bottom: 0.25rem;
    }

    .FieldType {
        color: var(--yellow0);
        font-weight: var(--bold);
    }

    .FieldArgs {
        margin-right: 0.1875rem;
    }

    .FieldName {
        display: block;
        font-weight: var(--bold);
        margin-right: 0.1875rem;
    }

    .FieldName:not(:first-child) {
        margin-top: 0.5rem;
    }

    .FieldName--field {
        color: var(--blue0)
    }

    .FieldName--enum {
        color: var(--pink100);
    }

    .FieldName--unionType {
        color: var(--green0);
    }

    a.FieldName:hover,
    a.FieldType:hover {
        color: var(--grey0);
    }

    .ArgumentName {
        margin-right: 0.1875rem;
    }

    .FieldDescription {
        color: var(--grey3);
        font-weight: var(--light);
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
        color: var(--blue0);
        font-weight: var(--bold);
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
        background: var(--grey0);
        transition: width .170s ease, transform .3s ease-in-out, background .270s;
    }

    burger-menu:hover burger-bar {
        background: var(--yellow0);
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
        transform: rotate(45deg)
    }

    burger-menu.ShowToggle burger-bar:nth-child(2) {
        width: 0;
    }

    burger-menu.ShowToggle burger-bar:last-child {
        transform: rotate(-45deg);
    }

    @media (min-width: 768px) {
        .Query {
            flex-direction: row;
            flex-wrap: nowrap;
        }
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
