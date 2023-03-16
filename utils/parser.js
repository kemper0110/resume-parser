const jsdom = require("jsdom");
const {JSDOM} = jsdom;

class Parser {
    #document;
    #info_fields;
    constructor(string_page = "") {
        this.#document = JSDOM.fragment(string_page);
        this.#info_fields = [
            {name: "fullname", method: () => this.#getName()},
            {name: "phone", method: () => this.#getPhone()},
            {name: "email", method: () => this.#getEmail()},
            {name: "education", method: () => this.#getEducation()},
            {name: "experience", method: () => this.#getExperience()},
        ]
    }

    getInfo() {
        const info = {}
        for (const field of this.#info_fields) {
            const value = field.method();
            if (value !== undefined)
                info[field.name] = value;
        }
        return info;
    }

    #getName() {
        const name = this.#document.querySelector('[data-qa="resume-personal-name"]')
        return name?.textContent;
    }

    #getPhone() {
        const number = this.#document.querySelector('[data-qa="resume-contacts-phone"] > span')
        return number?.textContent
    }

    #getEmail() {
        const email = this.#document.querySelector('[data-qa="resume-contact-email"] > a')
        return email?.textContent
    }

    #getEducation() {
        const education = this.#document.querySelector('[data-qa="resume-block-education"]')

        const name = education.querySelector('[data-qa="resume-block-education-name"]')?.textContent
        const organization = education.querySelector('[data-qa="resume-block-education-organization"]')?.textContent
        const head = education.querySelector('[data-qa="bloko-header-2"]')?.textContent

        return [head, name, organization].join('\r\n');
    }
    // Обход всех xml узлов
    #traverse(node, visitor) {
        if (node === null) return;
        visitor.head(node);
        const children = node.childNodes;
        if (children.length > 0)
            for (const node of children)
                this.#traverse(node, visitor);
        visitor.tail(node);
    }

    #getExperience() {
        const block = this.#document.querySelector('[data-qa="resume-block-experience"]')
        if(block === null) return undefined;
        let experience = "";
        const blockTags = new Set(["html", "head", "body", "frameset", "script", "noscript", "style", "meta", "link", "title", "frame", "noframes", "section", "nav", "aside", "hgroup", "header", "footer", "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "pre", "div", "blockquote", "hr", "address", "figure", "figcaption", "form", "fieldset", "ins", "del", "dl", "dt", "dd", "li", "table", "caption", "thead", "tfoot", "tbody", "colgroup", "col", "tr", "th", "td", "video", "audio", "canvas", "details", "menu", "plaintext", "template", "article", "main", "svg", "math", "center", "template", "dir", "applet", "marquee", "listing"]);
        const visitor = {
            head: node => {
                if(node === null)
                    return;
                switch (node.nodeType) {
                    case 1:
                        // элемент
                        if (
                            (blockTags.has(node.tagName.toLowerCase()) || node.tagName.toLowerCase() === 'br')
                            &&
                            experience.length > 0 && experience.at(experience.length - 1) !== '\n'
                        )
                            experience += '\n';
                        return;
                    case 3:
                        // текстовая нода
                        experience += node.textContent
                        return;
                }
            },
            tail: node => {
                if(node === null)
                    return;
                if (node.nodeType !== 1)
                    return;
                const next = node.nextSibling
                if(next === null)
                    return;
                if (blockTags.has(node.tagName.toLowerCase())
                    && (next.nodeType === 1 || next.nodeType === 3)
                    && experience.length > 0
                    && experience.at(experience.length - 1) !== '\n'
                )
                    experience += '\n';
            }
        }
        this.#traverse(block, visitor);

        // Возвращает просто конкантенацию текста из блоков - не подходит
        // const exp = this.#document.querySelector('[data-qa="resume-block-experience"]');
        // return exp?.textContent
        return experience;
    }
}


module.exports = Parser;