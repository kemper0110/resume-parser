// был вариант парсить в веб-приложении...
export default class Parser {
    #document;
    #info_fields;
    constructor(string_page = "") {
        this.#document = document;
        this.#info_fields = [
            {name: "fullname", method: () => this.#getName()},
            {name: "phone", method: () => this.#getPhone()},
            {name: "email", method: () => this.#getEmail()},
            {name: "education", method: () => this.#getEducation()},
            {name: "experience", method: () => this.#getExperience()},
            {name: "age", method: () => this.#getAge()},
            {name: "city", method: () => this.#getCity()}
        ]
    }
    getInfo() {
        const info = {}
        for(const field of this.#info_fields) {
            const value = field.method();
            if(value !== undefined)
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
        return education?.textContent
    }
    #getExperience() {
        const exp = this.#document.querySelector('[data-qa="resume-block-experience"]')
        return exp?.textContent
    }
    #getAge() {
        const age = this.#document.querySelector('[data-qa="resume-personal-age"]')
        return age?.textContent
    }
    #getCity() {
        const city = this.#document.querySelector('[data-qa="resume-personal-address"]')
        return city?.textContent
    }
}


