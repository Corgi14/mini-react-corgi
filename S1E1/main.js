// 1. 测试main.js被正常加载
// console.log('test')

// 2. js创建dom

// const dom = document.createElement('div')
// dom.id = 'app'
// document.querySelector('#root').append(dom)

// const textNode = document.createTextNode('')
// textNode.nodeValue = 'app'
// dom.appendChild(textNode)


// 3. 创建虚拟Dom
// const textEl = {
//     type: 'TEXT_ELEMENT',
//     props: {
//         nodeValue: 'app',
//         children: [],
//     }, 
// }
// const el = {
//     type: 'div',
//     props: {
//         id: 'app',
//         children: [textEl],
//     },
// }

// const dom = document.createElement(el.type)
// dom.id = el.props.id
// document.querySelector('#root').append(dom)

// const textNode = document.createTextNode('')
// textNode.nodeValue = textEl.props.nodeValue
// dom.append(textNode)

// 4. 动态创建虚拟dom
// function createTextNode(text) {
//     return {
//         type: 'TEXT_ELEMENT',
//         props: {
//             nodeValue: text,
//             children: []
//         }
//     }
// }

// function creatElement(type, props, ...children) {
//     return {
//         type: type,
//         props: {
//             ...props,
//             children
//         }
//     }
// }
// const textEl = createTextNode('app')
// const App = creatElement('div', 'app', textEl)

// const dom = document.createElement(App.type)
// dom.id = App.props.id
// document.querySelector('#root').append(dom)

// const textNode = document.createTextNode('')
// textNode.nodeValue = textEl.props.nodeValue
// dom.append(textNode)

// 5. render函数解析虚拟dom
function createTextNode(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}

function creatElement(type, props, ...children) {
    return {
        type: type,
        props: {
            ...props,
            children
        }
    }
}
function render(el, container) {
    const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(el.type)
    Object.keys(el.props).map(key => {
        if (key !== 'children') {
            dom[key] = el.props[key]
        }   
    })
    const children = el.props.children
    children.forEach((child) => {
        render(child, dom)
    })
    container.append(dom)
}

const textEl = createTextNode('app')
const App = creatElement('div', 'app', textEl)
render(App, document.querySelector('#root'))