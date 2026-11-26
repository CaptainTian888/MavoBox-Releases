# MavoBox 发布与官网

本公开仓库通过 GitHub Releases 分发 Windows / macOS 安装包，同时维护产品官网。官网采用一个 Cloudflare Worker、静态 HTML/CSS/JavaScript 与 D1，无框架、无构建步骤。

MavoBox 是本地优先的 TikTok 短视频桌面工具，提供爆款克隆、智能混剪与多账号定时发布。安装后无需激活码，AI 服务由用户自行配置并付费。网站邀请码仅用于一次安装包下载领取。

## 部署

准备 Node.js 22 或更新版本与 Cloudflare 账号，在本目录执行：

```powershell
npm i
npx wrangler login
npx wrangler d1 create mavobox-site
```

将输出的数据库 ID 填入 `wrangler.jsonc` 的 `database_id`，替换 `REPLACE_WITH_D1_ID`，然后执行：

```powershell
npm run db:migrate:remote
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put SESSION_SECRET
npm run deploy
```

分别设置两个不同的长随机值，至少 12 个字符，建议 32 个以上。不要将真实密码或密钥写进仓库。未配置或值过短时，管理与兑换接口返回 `not_configured`。

也可在 Cloudflare Dashboard → Workers & Pages → Create → Import a repository 连接本 GitHub 仓库，部署命令使用 `npm run deploy`，无需构建步骤。选择 main 分支后每次推送自动部署。仍须创建 D1、填入 ID、执行远程迁移，并在 Worker 设置上述 secrets。

## 本地开发与测试

```powershell
npm i
Copy-Item .dev.vars.example .dev.vars
# 在编辑器中将 .dev.vars 的示例值替换为自己的本地测试值
npm run db:migrate:local
npm run dev
```

`.dev.vars`、`node_modules/` 和 `.wrangler/` 已忽略。示例值只是占位符，切勿用于正式环境。管理 Cookie 始终带 Secure；Chrome 的 localhost 开发环境支持此行为。

```powershell
npm test
```

测试仅使用 Node 内置 `node:test` 和 Web Crypto，覆盖邀请码、日期边界、安装包选择与签名验证。实际 D1 并发、Cookie、GitHub release 和页面交互需在 Wrangler / Cloudflare 环境验收。

## 下载与管理

访问 `/admin/`，使用管理员密码登录。可设置全局每日下载限额（0 为关闭）、生成一次性邀请码、备注、复制、筛选和删除未使用的邀请码，并查看最近 14 天下载记录。列表最多显示最新 500 个码，“复制全部未使用”复制当前列表中的未使用码。

所有邀请码共享每日限额，默认 50，日期按 UTC+8 计算。兑换前检查对应平台安装包；成功兑换在同一个 D1 batch 事务内使用邀请码并累加计数。领取后返回一小时有效的签名链接，可保留该链接重试下载。签名授权平台，跳转时选择最新 release 的对应安装包。发布信息缓存十分钟。

登录密码失败五次会锁定该 IP，直至十五分钟窗口结束。登录会话有效十二小时。修改 SESSION_SECRET 会使现有管理会话和下载链接失效。

## 发布安装包

将构建完成的文件上传至本仓库的 GitHub Releases，例如：

```powershell
gh release create vX.Y.Z "MavoBox_X.Y.Z_x64-setup.exe" "MavoBox_X.Y.Z_x64-setup.exe.sig" latest.json SHA256SUMS.txt "MavoBox_X.Y.Z_aarch64.dmg" --title "MavoBox vX.Y.Z" --notes-file release-notes.md -R CaptainTian888/MavoBox-Releases
```

版本号和路径替换为实际产物；`release-notes.md` 由发布者准备。Windows 上传 setup `.exe` 及其 `.sig`，同时上传更新清单 `latest.json` 和校验文件 `SHA256SUMS.txt`；macOS 上传 `.dmg`。不要上传签名私钥或凭据。官网优先选名称包含 setup 的 `.exe`；没有对应安装包的平台不可领取。

GitHub Releases 安装包仍是公开资源；邀请码控制网站下载入口，不控制 GitHub 本身的访问权限。应用内签名更新使用发布清单，不依赖网站邀请码。

## 代码位置

- `src/worker.js`：公共 API、管理、GitHub 缓存与 D1 操作。
- `src/lib.js`：邀请码、日期、安装包选择与 HMAC。
- `public/`：双语官网、管理后台、样式和静态安全响应头。
- `migrations/0001_init.sql`：初始 D1 表结构。
- `test/logic.test.js`：无第三方依赖的辅助函数测试。
- `wrangler.jsonc`：Worker、静态资源与 D1 配置。
