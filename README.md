# docsify-auto-numbering
A lightweight docsify plugin for automatic heading numbering with Chinese numbering support.
一个轻量级 docsify 标题自动编号插件，支持中文编号、悬浮显示和自定义标题级别。

# docsify-auto-numbering

一个用于 [docsify](https://docsify.js.org/) 的标题自动编号插件。

该插件可以为 docsify 文档中的 `h1` ~ `h6` 标题自动添加编号，支持数字编号、中文编号、指定起始标题级别、排除标题级别、悬浮显示编号、始终显示编号等功能。

适合用于个人知识库、技术文档、学习笔记、Writeup 文档、项目说明文档等场景。

## 功能特性

- 支持 `h1` ~ `h6` 标题自动编号
- 支持从指定标题级别开始编号
- 支持排除指定标题级别
- 支持默认数字编号，例如 `1.2.3.`
- 支持中文编号，例如 `一、`、`二、`
- 支持编号悬浮显示
- 支持编号始终显示
- 支持编号显示在标题上方或标题前方
- 自动生成标题 `id`
- 避免重复标题导致的锚点冲突
- 避免编号污染标题锚点

## 使用方式

将 `docsify-auto-numbering.js` 文件放入你的 docsify 项目中，例如：

```text
docs/
├── index.html
├── README.md
└── plugins/
    └── docsify-auto-numbering.js
```

然后在 `index.html` 中引入插件：

```html
<script src="./plugins/docsify-auto-numbering.js"></script>
```

推荐放在 docsify 配置之后、docsify 主脚本之前：

```html
<script>
  window.$docsify = {
    name: 'My Docs',
    repo: '',
    autoNumbering: {
      levels: 6,
      startLevel: 2,
      exclude: ['h1'],
      mode: 'hover',
      numberingStyle: 'cn',
      position: 'top'
    }
  }
</script>

<script src="./plugins/docsify-auto-numbering.js"></script>
<script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
```

## 配置说明

可以通过 `window.$docsify.autoNumbering` 配置插件行为。

```js
window.$docsify = {
  autoNumbering: {
    levels: 6,
    startLevel: 2,
    exclude: ['h1'],
    mode: 'hover',
    numberingStyle: 'cn',
    position: 'top'
  }
}
```

## 配置项

| 配置项 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `levels` | `Number` | `6` | 最大编号标题级别 |
| `startLevel` | `Number` | `2` | 从哪个标题级别开始编号 |
| `exclude` | `Array` | `[]` | 排除不参与编号的标题，例如 `['h1']` |
| `mode` | `String` | `hover` | 编号显示方式，可选值：`hover`、`always` |
| `numberingStyle` | `String` | `default` | 编号样式，可选值：`default`、`cn` |
| `position` | `String` | `top` | 编号显示位置，可选值：`top`、`inline` |

## 编号样式说明

### 默认数字编号

当 `numberingStyle` 设置为 `default` 时，标题编号格式如下：

```text
1.
1.1.
1.1.1.
```

示例配置：

```js
window.$docsify = {
  autoNumbering: {
    numberingStyle: 'default'
  }
}
```

### 中文编号

当 `numberingStyle` 设置为 `cn` 时，二级标题编号格式如下：

```text
一、
二、
三、
```

三级标题会显示为：

```text
1、
2、
3、
```

四级及以下标题会显示为：

```text
1.1.
1.1.1.
```

示例配置：

```js
window.$docsify = {
  autoNumbering: {
    numberingStyle: 'cn'
  }
}
```

## 显示模式

### 悬浮显示

```js
window.$docsify = {
  autoNumbering: {
    mode: 'hover'
  }
}
```

### 始终显示

```js
window.$docsify = {
  autoNumbering: {
    mode: 'always'
  }
}
```

## 显示位置

### 显示在标题上方

```js
window.$docsify = {
  autoNumbering: {
    position: 'top'
  }
}
```

### 显示在标题前方

```js
window.$docsify = {
  autoNumbering: {
    position: 'inline'
  }
}
```

## 推荐 CSS

插件会自动为编号元素添加以下 class：

```text
doc-number
doc-number--top
doc-number--inline
doc-number--always
```

你可以根据自己的 docsify 主题自定义样式。

```css
.markdown-section h1,
.markdown-section h2,
.markdown-section h3,
.markdown-section h4,
.markdown-section h5,
.markdown-section h6 {
  position: relative;
}

.doc-number {
  white-space: nowrap;
  pointer-events: none;
}

.doc-number--inline {
  margin-right: 0.4em;
  opacity: 0.6;
}

.doc-number--top {
  position: absolute;
  left: 0;
  bottom: 100%;
  font-size: 0.75em;
  font-weight: normal;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.markdown-section h1:hover .doc-number--top,
.markdown-section h2:hover .doc-number--top,
.markdown-section h3:hover .doc-number--top,
.markdown-section h4:hover .doc-number--top,
.markdown-section h5:hover .doc-number--top,
.markdown-section h6:hover .doc-number--top {
  opacity: 0.6;
  transform: translateY(0);
}

.doc-number--always {
  opacity: 0.6;
}
```

## 示例效果

Markdown 文档：

```md
## 第一章

### 第一节

### 第二节

## 第二章

### 第一节
```

使用默认数字编号后：

```text
1. 第一章
1.1. 第一节
1.2. 第二节
2. 第二章
2.1. 第一节
```

使用中文编号后：

```text
一、第一章
1、第一节
2、第二节
二、第二章
1、第一节
```

## 注意事项

- 插件会在 docsify 每次页面渲染完成后重新计算标题编号。
- 插件会自动移除旧的 `.doc-number` 元素，避免重复编号。
- 插件会尽量保留标题原有结构，避免直接修改标题 `innerHTML`。
- 如果标题本身已经存在 `id`，插件不会覆盖原有 `id`。
- 如果标题没有 `id`，插件会根据标题文本自动生成唯一 `id`。
- 中文编号目前主要用于二级标题，支持 `一、` 到 `九十九、`，超过后会回退为数字。


## 作者

- Author: 马小战
- Email: jav1988@qq.com

## License

MIT
