// Landing-page copy: [中文, English]. Merged over the shared strings in i18n.js (which the admin page also uses).
export const siteText = {
  // nav
  navFeatures: ['功能', 'Features'],
  navHow: ['工作方式', 'How it works'],
  navPrivacy: ['隐私与费用', 'Privacy & cost'],
  navFAQ: ['常见问题', 'FAQ'],
  navDownload: ['下载', 'Download'],

  // hero
  eyebrow: ['为 TikTok 短视频创作者打造的桌面工作台', 'The desktop studio for TikTok creators'],
  heroA: ['把一条爆款，', 'Turn one viral hit'],
  heroB: ['变成你的一百条好视频。', 'into a hundred of your own.'],
  intro: ['拆解爆款钩子、改写成你的产品脚本、批量生成竖屏成片，再按计划发到多个账号。全部在你自己的电脑上运行，素材和密钥不离开本机。',
    'Break down viral hooks, rewrite them for your product, render vertical videos in batches, and publish on schedule across accounts — all on your own computer, with footage and keys never leaving it.'],
  ctaPrimary: ['用邀请码下载', 'Download with invite code'],
  ctaSecondary: ['看看它能做什么', 'See what it does'],
  badgeWin: ['Windows 10 / 11', 'Windows 10 / 11'],
  badgeMac: ['macOS（即将推出）', 'macOS (coming soon)'],
  badgeLocal: ['本地优先 · 无云端账号', 'Local-first · no cloud account'],
  badgeFree: ['安装即用 · 无需激活码', 'Ready after install · no activation'],

  // hero mock
  mockTitle: ['爆款克隆 · 变体生成', 'Viral clone · variants'],
  mockRef: ['参考视频', 'Reference'],
  mockHook: ['钩子：前 1.8 秒抛出反差问题', 'Hook: a contrast question in the first 1.8 s'],
  mockScript: ['改写脚本', 'Rewritten script'],
  mockRender: ['渲染成片', 'Rendering'],
  mockVariants: ['12 / 20 个变体完成', '12 / 20 variants done'],
  mockCost: ['预计费用 $1.84 · 等待你确认', 'Estimated $1.84 · awaiting your OK'],

  // stats
  stat1: ['20', '20'], stat1t: ['个变体一次展开', 'variants per run'],
  stat2: ['9:16', '9:16'], stat2t: ['竖屏成片直接可发', 'vertical, ready to post'],
  stat3: ['−14', '−14'], stat3t: ['LUFS 响度自动归一', 'LUFS loudness normalized'],
  stat4: ['0', '0'], stat4t: ['云端账号与遥测', 'cloud accounts or telemetry'],

  // modules
  modulesEyebrow: ['三大核心模块', 'Three core modules'],
  modulesTitle: ['从找灵感到发出去，一条线走完。', 'From inspiration to posted — in one flow.'],
  modulesSub: ['把重复劳动交给工具，把创意判断留给你自己。', 'Let the tool do the repetitive work. Keep the creative calls yours.'],

  cloneTag: ['01 · 爆款克隆', '01 · Viral clone'],
  cloneTitle: ['读懂一条爆款为什么火，再为你的产品重写一遍。', 'Understand why a video went viral — then rewrite it for your product.'],
  cloneText: ['给它一条参考视频（链接或本地文件）、你的产品图或人物图和要求，它会逐词转写、分析镜头节奏和钩子，改写成你的脚本与分镜，再调用你配置的图片、配音、视频生成服务，合成带逐词高亮字幕的竖屏成片。',
    'Give it a reference video (link or file), your product or person images and a brief. It transcribes word by word, analyzes shot rhythm and the hook, rewrites the script and shot list for you, then calls your image, voice and video APIs to assemble a vertical video with word-by-word highlighted captions.'],
  clone1: ['词级转写 + 镜头节奏 + "为什么有效"的解读', 'Word-level transcript, shot rhythm and a "why it works" read-out'],
  clone2: ['围绕你的产品改写脚本、分镜和口播', 'Script, shot list and voice-over rewritten around your product'],
  clone3: ['按词级时间对齐的逐词高亮字幕', 'Word-by-word highlighted captions aligned to word timings'],
  clone4: ['一次最多展开 20 个变体，挑最好的发', 'Up to 20 variants per run — post the best one'],

  remixTag: ['02 · 智能混剪', '02 · Smart remix'],
  remixTitle: ['一堆素材丢进去，剪出一条有节奏的成片。', 'Drop in a pile of footage, get back a well-paced edit.'],
  remixText: ['选一批视频或整个文件夹，写下剪辑要求。它自动切镜头、抽关键帧，让大模型理解每个镜头，只输出一份剪辑时间线；校验通过后由 ffmpeg 渲染成 9:16 成片。时间线随时可以手动改。',
    'Pick a batch of clips or a whole folder and describe the edit. It detects shots and extracts keyframes, lets the LLM understand each shot and output only an edit timeline, validates it, and renders a 9:16 video with ffmpeg. The timeline stays hand-editable.'],
  remix1: ['自动切镜头、抽关键帧（PySceneDetect + OpenCV）', 'Automatic shot detection and keyframes (PySceneDetect + OpenCV)'],
  remix2: ['大模型只输出时间线 JSON，结果可校验、可复现', 'The LLM outputs only a timeline JSON — checkable and reproducible'],
  remix3: ['时间线可视化编辑，改完再渲染', 'Edit the timeline visually, then render'],
  remix4: ['成片质检：画幅、黑屏、静音、爆音一键检查', 'Quality check: aspect, black frames, silence and clipping in one click'],

  publishTag: ['03 · 账号与发布', '03 · Accounts & publishing'],
  publishTitle: ['多个账号，各自独立，按时自动发布。', 'Many accounts, fully isolated, published on time.'],
  publishText: ['每个账号有独立的浏览器环境、代理、语言、时区和窗口尺寸。设好文案、话题和时间，到点自动发布；随机错峰、同账号和同代理互斥、失败重试、重启后自动恢复。遇到验证码会停下来交给你处理。',
    'Each account gets its own browser profile, proxy, locale, timezone and viewport. Set caption, hashtags and time; it publishes on schedule with random staggering, per-account and per-proxy mutual exclusion, retries and restart recovery. Captchas are handed to you.'],
  publish1: ['每账号独立浏览器环境与代理', 'Isolated browser profile and proxy per account'],
  publish2: ['定时发布 + 随机错峰 + 并发控制', 'Scheduled posts, random staggering, concurrency limits'],
  publish3: ['失败重试、重启恢复，结果不明转人工确认', 'Retries, restart recovery, unclear results go to you'],
  publish4: ['防重复发布：重试前先确认视频没发出去', 'No double posts: confirm before any retry'],

  // mock bits
  mClone1: ['如果', 'What'], mClone2: ['你的', 'if'], mClone3: ['护肤', 'your'], mClone4: ['只需要', 'skincare'], mClone5: ['三步？', 'took 3 steps?'],
  mRemixTrack1: ['画面', 'Video'], mRemixTrack2: ['字幕', 'Captions'], mRemixTrack3: ['音乐', 'Music'],
  mPubAcc1: ['@beauty.lab · 美国代理', '@beauty.lab · US proxy'], mPubAcc2: ['@home.finds · 英国代理', '@home.finds · UK proxy'], mPubAcc3: ['@gadget.daily · 日本代理', '@gadget.daily · JP proxy'],
  mPubS1: ['已发布', 'Posted'], mPubS2: ['20:30 发布', 'Posts 20:30'], mPubS3: ['需要人工确认', 'Needs your check'],

  // parallel engine: pipeline + swarm
  navEngine: ['并行引擎', 'Parallel engine'],
  engEyebrow: ['并行引擎 · 蜂群模式 + 流水线', 'Parallel engine · swarm + pipelines'],
  engTitle: ['不再一件一件排队等，所有能同时做的事都同时做。', 'Stop waiting in line — everything that can run at once, does.'],
  engSub: ['MAVO BOX 把每个流程拆成相互独立的小任务，按依赖关系自动排成流水线；多个项目、多个变体像蜂群一样同时推进。付费 AI 调用和本地渲染各有并发上限，快，但不失控。',
    'MAVO BOX breaks every flow into independent steps and arranges them into a dependency-aware pipeline, while many projects and variants advance together like a swarm. Paid AI calls and local rendering each have their own concurrency caps — fast, but never out of control.'],
  pipeTag: ['多任务流水线并行', 'Pipelined multi-tasking'],
  pipeTitle: ['一条成片里的步骤，能并行的全部并行。', 'Inside one video, every step that can overlap does.'],
  pipeText: ['定妆图一完成，用到它的镜头视频立刻同时开拍；配音和视频一起生成；全部就绪后自动组装、渲染。智能混剪里，多个素材同时切镜头，每切完一个就马上交给大模型打标签。',
    'As soon as an anchor image is ready, every shot that uses it starts generating in parallel; voice-over runs alongside the video; when all parts are in, assembly and rendering follow automatically. In Smart remix, clips are cut in parallel and each clip goes to the LLM for tagging the moment it is cut.'],
  ganttSerial: ['以前：一步接一步', 'Before: one step at a time'],
  ganttParallel: ['现在：按依赖并行', 'Now: in parallel, by dependency'],
  lgAnchor: ['定妆图', 'Anchor'], lgVideo: ['镜头视频', 'Shot video'], lgVoice: ['配音', 'Voice-over'], lgRender: ['组装渲染', 'Assemble & render'],
  ganttSaving: ['示意：3 个镜头的一条成片，总耗时约为原来的 45%（实际取决于服务商速度）。', 'Illustration: a 3-shot video finishes in about 45% of the time (actual speed depends on your providers).'],
  swarmTag: ['蜂群模式', 'Swarm mode'],
  swarmTitle: ['一次展开 20 个变体，一起规划、一起生成、一起出片。', 'Spin up 20 variants and let them plan, generate and render together.'],
  swarmText: ['变体不再排队一个个跑：它们同时推进，共享参考解读和生成缓存——相同的素材只付一次钱，并且共用同一个预算上限。看板上每个变体的进度一目了然。',
    'Variants no longer run one after another: they advance together, sharing the reference analysis and the generation cache — identical requests are paid once — under one shared budget cap. A live board shows every variant’s progress.'],
  hvDone: ['已出片', 'Rendered'], hvRun: ['进行中', 'Running'], hvQueue: ['排队中', 'Queued'],
  swarm1: ['多个变体同时规划、生成、渲染', 'Variants plan, generate and render side by side'],
  swarm2: ['共享缓存：同一请求跨变体只提交一次', 'Shared cache: an identical request is submitted once across variants'],
  swarm3: ['共享预算：全部变体合计报价、确认后才开始', 'Shared budget: one combined quote, confirmed before anything starts'],
  ep1: ['按服务分槽位', 'Per-service slots'], ep1t: ['视频、配音、大模型、图片各有并发上限，可按你的套餐单独调整。', 'Video, voice, LLM and image providers each have their own cap, tunable to your plan.'],
  ep2: ['遇限流自动降速', 'Backs off on rate limits'], ep2t: ['服务商返回“请求过多”时，该服务自动减半并发一分钟，其余流程照常。', 'When a provider says “too many requests”, that service halves its concurrency for a minute while everything else carries on.'],
  ep3: ['失败即停不浪费', 'Stops spending on failure'], ep3t: ['任一步失败后不再发起新的付费请求，已提交的任务照常收回结果。', 'After a failure no new paid request starts, and jobs already submitted are still collected.'],
  ep4: ['实时工作台', 'Live workspace'], ep4t: ['在「工作台」看每个槽位的占用、排队和每条流水线的进度。', 'The Workspace shows every slot’s usage, the queue and each pipeline’s progress in real time.'],
  apTag: ['一条龙自动发布', 'End-to-end autopilot'],
  apTitle: ['出片、质检、排期，一条龙自动完成。', 'Render, check and schedule — hands-free.'],
  apText: ['给项目开启一条龙规则：每出一条成片就自动质检，通过后按你设定的账号轮流、间隔和错峰自动创建定时发布任务。任务默认仅自己可见并标注 AI，发出前你随时可以修改或取消。',
    'Turn on an autopilot rule: every finished video is quality-checked, then scheduled across your accounts with the rotation, spacing and stagger you choose. Jobs default to private with the AI label, and you can edit or cancel any of them before they post.'],
  ap1: ['渲染出片', 'Render'], ap2: ['自动质检', 'Auto QA'], ap3: ['轮流分配账号', 'Rotate accounts'], ap4: ['错峰定时发布', 'Staggered schedule'],

  // more capabilities
  moreEyebrow: ['不止三个模块', 'And a lot more'],
  moreTitle: ['把容易出错的细节，都提前替你做好。', 'The fiddly details, already handled.'],
  more1: ['素材下载', 'Footage download'], more1t: ['粘贴 TikTok 链接，下载并截取前 N 秒入库。', 'Paste a TikTok link to download and clip the first N seconds into your library.'],
  more2: ['成片质检', 'Quality check'], more2t: ['画幅、时长、帧率、黑屏、静止、静音、响度和爆音，附 12 帧联系表。', 'Aspect, duration, frame rate, black or frozen frames, silence, loudness and clipping, plus a 12-frame contact sheet.'],
  more3: ['响度归一', 'Loudness normalization'], more3t: ['成片默认约 −14 LUFS、真峰值不高于 −1.5 dBTP，不会忽大忽小。', 'Outputs default to about −14 LUFS with true peak ≤ −1.5 dBTP — no sudden jumps.'],
  more4: ['内置本地网关', 'Built-in local gateway'], more4t: ['自带 GPT-Load：多 Key 轮询、订阅账号接入，一键启用。', 'Ships with GPT-Load: key pools and subscription accounts, one click to enable.'],
  more5: ['任意 OpenAI 兼容服务', 'Any OpenAI-compatible API'], more5t: ['填地址即可接入，支持"测试连接 / 获取模型列表"。', 'Point it at any endpoint, with test-connection and model-list buttons.'],
  more6: ['首次使用向导', 'First-run wizard'], more6t: ['环境自检、一键安装浏览器组件、常见服务预设和价格页链接。', 'Environment check, one-click browser component install, service presets and pricing links.'],
  more7: ['诊断报告', 'Diagnostics'], more7t: ['一键复制不含密钥的诊断报告，日志自动脱敏、滚动保存。', 'Copy a secret-free diagnostics report in one click; logs are scrubbed and rotated.'],
  more8: ['签名自动更新', 'Signed auto-update'], more8t: ['启动时检查新版本，校验签名后静默安装，数据和配置保留。', 'Checks on launch, verifies the signature, installs silently, keeps your data.'],

  // how it works
  howEyebrow: ['工作方式', 'How it works'],
  howTitle: ['一切都在你的电脑里发生。', 'Everything happens on your computer.'],
  howSub: ['只有在你确认之后，才会调用你自己配置的 AI 服务。', 'Your own AI services are called only after you confirm.'],
  archPc: ['你的电脑', 'Your computer'],
  archUi: ['MAVO BOX 桌面窗口', 'MAVO BOX desktop window'],
  archBackend: ['本地后端 · 仅监听 127.0.0.1', 'Local backend · 127.0.0.1 only'],
  archQueue: ['任务队列与调度', 'Task queue & scheduler'],
  archMedia: ['ffmpeg · yt-dlp · Playwright', 'ffmpeg · yt-dlp · Playwright'],
  archVault: ['系统凭据库（存 API Key）', 'OS credential store (API keys)'],
  archConfirm: ['仅在你确认后', 'Only after you confirm'],
  archApis: ['你配置的 AI 服务', 'Your AI services'],
  archApisT: ['大模型 · 语音识别 · 配音 · 图片 · 视频生成', 'LLM · speech-to-text · voice · image · video generation'],

  // providers
  provEyebrow: ['自带服务，自由组合', 'Bring your own services'],
  provTitle: ['用你已经在用的 AI，费用记在你自己的账上。', 'Use the AI you already pay for — billed to your own account.'],
  provSub: ['按能力分别配置，随时更换；也可以通过内置网关接入订阅账号或多 Key 池。', 'Configure each capability separately and swap any time, or connect subscription accounts and key pools through the built-in gateway.'],
  provCat1: ['大模型', 'LLM'], provCat2: ['语音识别', 'Speech-to-text'], provCat3: ['配音', 'Voice'], provCat4: ['图片生成', 'Image'], provCat5: ['视频生成', 'Video'],
  provChip5: ['自定义 HTTP', 'Custom HTTP'], provChip6: ['GPT-Load 本地网关', 'GPT-Load local gateway'],

  // privacy & cost
  privEyebrow: ['隐私与费用', 'Privacy & cost'],
  privTitle: ['你的素材、密钥和钱，都由你说了算。', 'Your footage, your keys, your money — your call.'],
  priv1: ['素材只在本机', 'Footage stays local'], priv1t: ['没有云端账号系统，没有遥测；所有数据都在你电脑的数据目录里。', 'No cloud account system, no telemetry; everything lives in a folder on your machine.'],
  priv2: ['密钥不落明文', 'Keys never in plain text'], priv2t: ['API Key 与代理密码存入系统凭据管理器，日志和报错里看不到。', 'API keys and proxy passwords go to the OS credential store, never into logs or errors.'],
  priv3: ['花钱前先报价', 'A quote before any spend'], priv3t: ['默认只估算费用；价格变了旧确认自动作废，付费请求不会自动重发。', 'Estimates by default; a changed price voids the old confirmation, and paid requests never auto-retry.'],
  priv4: ['只对本机开放', 'Local-only by design'], priv4t: ['后端只监听 127.0.0.1 并校验来源，网页脚本无法调用你的本地接口。', 'The backend listens on 127.0.0.1 only and checks origins, so web pages can’t reach it.'],
  priv5: ['更新有签名', 'Signed updates'], priv5t: ['每个更新包都用内置公钥校验签名，无法被冒充。', 'Every update is verified against a built-in public key and can’t be spoofed.'],
  priv6: ['合规有提醒', 'Compliance reminders'], priv6t: ['默认不把参考视频的画面和音乐放进成片，发布 AI 内容时提醒你标注。', 'Reference footage and music are kept out of outputs by default, with AI-label reminders when posting.'],

  // audience
  whoEyebrow: ['适合谁', 'Who it’s for'],
  whoTitle: ['一个人也能跑起一条内容生产线。', 'A one-person content pipeline.'],
  who1: ['跨境电商卖家', 'Cross-border sellers'], who1t: ['同一个产品快速出多版带货视频，测出跑量的那一条。', 'Spin up many product-video versions fast and find the one that converts.'],
  who2: ['内容与矩阵团队', 'Content & multi-account teams'], who2t: ['多账号隔离、定时错峰发布，减少手动操作和误发。', 'Isolated accounts and staggered schedules mean less manual work and fewer mistakes.'],
  who3: ['培训课程学员', 'Course students'], who3t: ['照着课程用起来：装好就能用，向导一步步带你配置。', 'Follow along with your course: install and go, with a wizard that sets you up step by step.'],

  // steps
  stepsEyebrow: ['三步上手', 'Get going in three steps'],
  stepsTitle: ['十分钟，从安装到第一条成片。', 'Ten minutes from install to your first video.'],
  step1: ['下载安装', 'Download & install'], step1text: ['用邀请码领取安装包，双击安装，打开即用。', 'Redeem your invite code, run the installer, open the app.'],
  step2: ['向导配置', 'Run the wizard'], step2text: ['确认内置 ffmpeg，按需安装浏览器组件，填入你自己的 AI 服务。', 'Confirm the bundled ffmpeg, install the browser component if needed, add your AI services.'],
  step3: ['开始创作', 'Start creating'], step3text: ['导入参考视频或素材，生成、质检、排期发布。', 'Import a reference or footage, then generate, check and schedule.'],

  // requirements
  reqTitle: ['系统要求', 'System requirements'],
  winReq: ['Windows 10 / 11（64 位）', 'Windows 10 / 11 (64-bit)'],
  winReqT: ['安装包约 175 MB，已内置 ffmpeg 和本地网关。', 'About 175 MB installer, ffmpeg and the local gateway included.'],
  macReq: ['macOS（Apple 芯片）', 'macOS (Apple silicon)'],
  macReqT: ['即将推出，敬请期待。', 'Coming soon.'],
  disk: ['磁盘：建议预留 5 GB 以上给素材与成片；发布功能首次使用需下载约 150 MB 浏览器组件。', 'Disk: keep 5 GB+ free for footage and outputs; publishing downloads a ~150 MB browser component on first use.'],
  network: ['网络：AI 服务、视频下载、发布和更新需要联网，均直连你配置的服务。', 'Network: AI services, downloads, publishing and updates need internet and talk directly to the services you configure.'],

  // download
  downloadEyebrow: ['获取 MAVO BOX', 'Get MAVO BOX'],
  downloadTitle: ['输入邀请码，领取安装包', 'Enter your invite code to download'],
  downloadSub: ['邀请码由课程老师或团队管理员发放。每个邀请码只能使用一次，领取后 1 小时内可重复下载。', 'Invite codes come from your course teacher or team admin. Each code works once; the link stays valid for an hour so you can retry.'],
  latestLabel: ['最新版本', 'Latest version'],

  // faq extras
  q7: ['使用要花钱吗？', 'Does it cost anything?'],
  a7: ['软件本身免费使用。AI 生成调用的是你自己配置的服务，费用记在你自己的账户上；每次付费调用前都会先给出估算，等你确认。', 'The app itself is free to use. AI generation runs on services you configure and bills your own accounts; every paid call shows an estimate first and waits for your OK.'],
  q8: ['我的数据存在哪里？', 'Where is my data stored?'],
  a8: ['Windows 在 %LOCALAPPDATA%\\TikTolTool，macOS 在 ~/Library/Application Support/TikTolTool。卸载软件不会删除这些数据。', 'Windows: %LOCALAPPDATA%\\TikTolTool. macOS: ~/Library/Application Support/TikTolTool. Uninstalling keeps this data.'],
  q9: ['有合规风险吗？', 'Are there compliance risks?'],
  a9: ['请只学习爆款的结构和节奏，用自己的产品与人物重新生成，不要搬运他人画面、音乐和台词。自动化发布有被平台限流的风险，新号请先手动养号，多账号使用各自独立的代理。', 'Learn structure and pacing only; regenerate with your own products and people, and don’t reuse others’ footage, music or lines. Automated posting can trigger platform limits — warm up new accounts manually and give each account its own proxy.'],

  // cta + footer
  ctaTitle: ['准备好做下一条爆款了吗？', 'Ready to make your next hit?'],
  ctaSub: ['拿到邀请码，几分钟就能开始。', 'Grab an invite code and you’re minutes away.'],
  footer: ['本地优先的 TikTok 短视频创作工作台。', 'The local-first studio for TikTok short video.'],
  footReleases: ['所有版本', 'All releases'],
  footChangelog: ['更新说明', 'Release notes'],
};
