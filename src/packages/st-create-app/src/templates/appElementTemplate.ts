import {springTypeLogoTemplate} from "./springTypeLogoTemplate";

export const appElementTemplate = (filePath: string) => `<div class="container">
    ${springTypeLogoTemplate('#ffffff')}
    <br />
    <p>Thank you for choosing SpringType!️</p>
    <p>👉 Find me here: <code>${filePath}</code> 👈</p>
    <p>Create new elements: <code>npx st-create-element my-new-element</code></p>
    <p>Enable features: <code>npx st-enable router</code></p>
    <br />
    <a href="https://springtype.org" target="_blank">📚 Get to know SpringType 📚</a>
    <br /><br />
    <a href="https://patreon.com/springtype" target="_blank">
        💰 Please become a Patreon 💰
    </a>
</div>
`;