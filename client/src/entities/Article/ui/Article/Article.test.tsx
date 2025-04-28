import {render} from "@testing-library/react";
import { Article } from "./Article";
import {withRedux} from "shared/lib/tests/withRedux";
import {ArticleType} from "../../index";
import {CodeBlock, ImageBlock, TextBlock} from "../../model/types/article";
import {StateSchema} from "app/StoreProvider";

const textBlock = {
    "id": "1",
    "type": "TEXT",
    "title": "Заголовок этого блока",
    "paragraphs": [
        "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.",
        "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.",
        "Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:"
    ]
} as TextBlock
const imageBlock = {
    "id": "2",
    "type": "IMAGE",
    "src": "https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png",
    "title": "Рисунок 1 - скриншот сайта"
} as ImageBlock
const codeBlock = {
    "id": "4",
    "type": "CODE",
    "code": "<!DOCTYPE html>\n<html>\n  <body>\n    <p id=\"hello\"></p>\n\n    <script>\n      document.getElementById(\"hello\").innerHTML = \"Hello, world!\";\n    </script>\n  </body>\n</html>;"
} as CodeBlock

const articleDataMock = {
        "id": "1",
        "title": "Javascript news",
        "subtitle": "Что нового в JS за 2022 год?",
        "img": "https://teknotower.com/wp-content/uploads/2020/11/js.png",
        "views": 1022,
        "createdAt": "26.02.2022",
        "user": {
            id: '1',
            username: 'username'
        },
        "type": [
            "IT"
        ],
        "blocks": [
            textBlock,
            imageBlock,
            codeBlock
        ]
    } as ArticleType


describe('Article tests', async () => {
    beforeAll(() => {

    })
    it('should render article with correct data', function () {

    });
    it('should render error', function () {

    });
    it('should render skeleton when is loading', function () {

    });
})