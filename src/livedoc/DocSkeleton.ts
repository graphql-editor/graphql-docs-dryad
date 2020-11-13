import { Colors } from '../Colors';

export const DocSkeletonStatic = ({
  body,
  startingType,
}: {
  body: string;
  startingType?: string;
}) => `
  <html>
      <head>
        <style>
            body{
              margin: 0;
              height:100%;
              display: flex;
              background: ${Colors.main[10]};
              font-family: 'Roboto';
            }
        </style>
        <link rel="stylesheet" href="styles.css" />
        <script>
            window.scrollDocs = (name) => {
                const element = document.getElementById(name);
                document.getElementById('__Type').scrollTo({
                behavior: 'smooth',
                top: element.offsetTop,
                });
            };
            window.toggleMenu = () => {
              const menuElement = document.getElementById('Menu');
              const nextToggle = menuElement.classList.contains('ShowToggle');
              if (nextToggle) {
                menuElement.classList.remove('ShowToggle');
              } else {
                menuElement.classList.add('ShowToggle');
              }
            };
            ${
              startingType
                ? `window.location.href = window.location.href + "#Docs-" + "${startingType}";`
                : ''
            }
        </script>  
      </head>
      <body>
          ${body}
      </body>
  </html>
  `;
