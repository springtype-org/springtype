import {kebabToCamelCase} from "../function/kebabToCamelCase";

export const indexHtmlTemplate = (appName: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <title>${kebabToCamelCase(appName)}</title>

    <!-- main application logic entry-point -->
    <script src="${appName}-app.tsx"></script>

</head>
<body>
    <div class="container">
        <${appName}-app />
    </div>
</body>
</html>`;