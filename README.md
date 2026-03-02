# TouchFish 支持列表

一个纯静态的软件展示页面，用于列举 TouchFish 项目旗下的所有软件。基于 [MDUI 2](https://www.mdui.org/) 构建，Material Design 3 风格。


## 对配置的说明

`config.json` 是本项目的**唯一配置文件**，所有内容均从此处读取，无需改动 HTML/JS/CSS。

### `site` — 站点信息

| 字段         | 类型   | 说明                       |
| ------------ | ------ | -------------------------- |
| `title`      | string | 页面标题（顶栏 & 浏览器 Tab） |
| `subtitle`   | string | 页面副标题                 |
| `author`     | string | 项目作者（显示在底部）     |
| `maintainer` | string | 主维护者（显示在底部）     |

```json
"site": {
  "title": "TouchFish 支持列表",
  "subtitle": "TouchFish 项目旗下的所有软件",
  "author": "TouchFish Team",
  "maintainer": "2044-space-elevator"
}
```

`author` 和 `maintainer` 任一不为空时，页面底部将显示对应信息。若两者均为空字符串或缺失，则不显示底部信息条。

---

### `categories` — 分类列表

控制顶部 Tab 栏的分类项，**`id: "all"` 的分类会默认选中并展示全部软件**。

| 字段   | 类型   | 说明                         |
| ------ | ------ | ---------------------------- |
| `id`   | string | 唯一标识，用于与 app 关联    |
| `name` | string | 显示名称                     |
| `icon` | string | Material Icons 图标名        |

```json
"categories": [
  { "id": "all",   "name": "全部", "icon": "apps"  },
  { "id": "chat",  "name": "聊天", "icon": "chat"  },
  { "id": "tools", "name": "工具", "icon": "build" }
]
```

---

### `apps` — 软件列表

每个条目对应一张卡片。

| 字段              | 类型    | 必填 | 说明                                        |
| ----------------- | ------- | ---- | ------------------------------------------- |
| `id`              | string  | ✅   | 唯一标识                                    |
| `name`            | string  | ✅   | 软件名称                                    |
| `category`        | string  | ✅   | 对应 `categories` 中的 `id`                 |
| `icon`            | object  | ✅   | 图标（见下方说明）                          |
| `description`     | string  | ✅   | 卡片简介（建议不超过 50 字）                |
| `fullDescription` | string  | ✅   | 详情弹窗中的完整描述                        |
| `isOpenSource`    | boolean | ✅   | 是否开源                                   |
| `license`         | string  |      | 许可证名称，开源时建议填写                  |
| `author`          | string  |      | 该软件的作者                                |
| `maintainer`      | string  |      | 该软件的主维护者                            |
| `website`         | string  |      | 官网链接（为空则不显示"访问网站"按钮）      |
| `github`          | string  |      | GitHub 链接（为空则不显示"GitHub"按钮）     |

#### `icon` 对象

支持三种类型：

```json
// Material Icons 
{ "type": "material", "value": "security" }

// 图片 URL
{ "type": "url", "value": "logo.png" }
{ "type": "image", "value": "https://example.com/icon.png" }

// Emoji
{ "type": "emoji", "value": "🐟" }
```

## 许可证

本项目仓库代码采用 [MIT License](LICENSE) 授权。各软件条目的许可证以其自身声明为准。
