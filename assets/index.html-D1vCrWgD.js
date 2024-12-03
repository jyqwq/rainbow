import{_ as i,c as a,f as n,o as e}from"./app-LYC0rH-0.js";const l={};function t(h,s){return e(),a("div",null,s[0]||(s[0]=[n(`<h3 id="ubuntu-docker" tabindex="-1"><a class="header-anchor" href="#ubuntu-docker"><span>ubuntu docker</span></a></h3><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> apt</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> update</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> apt</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> upgrade</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">apt-get</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> install</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> ca-certificates</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> curl</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> gnupg</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> lsb-release</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">curl</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -fsSL</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> apt-key</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> add</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> -</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> add-apt-repository</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">$(</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">lsb_release</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -cs</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> stable</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">apt-get</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> install</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> docker-ce</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> docker-ce-cli</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> containerd.io</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> usermod</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -aG</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> docker</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> $USER</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">systemctl</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> start</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> docker</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">apt-get</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -y</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> install</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> apt-transport-https</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> ca-certificates</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> curl</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> software-properties-common</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">service</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> docker</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> restart</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-mysql" tabindex="-1"><a class="header-anchor" href="#docker-mysql"><span>docker mysql</span></a></h3><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">docker</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> run</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -p</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 3306:3306</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --name</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> mysql</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --restart=always</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --privileged=true</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">-v </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/usr/local/mysql/log:/var/log/mysql</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">-v </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/usr/local/mysql/data:/var/lib/mysql</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">-v </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/usr/local/mysql/conf:/etc/mysql</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">-v </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/etc/localtime:/etc/localtime:ro</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">-e </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">MYSQL_ROOT_PASSWORD=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">123456</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -d</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> mysql:latest</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="mysql容器添加vim" tabindex="-1"><a class="header-anchor" href="#mysql容器添加vim"><span>mysql容器添加vim</span></a></h4><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">apt-get</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> update</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">apt-get</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> install</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> vim</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="mac重置mysql密码" tabindex="-1"><a class="header-anchor" href="#mac重置mysql密码"><span>mac重置mysql密码</span></a></h4><p>方法一：使用系统偏好设置</p><p>首先打开系统偏好设置，然后点击“MySQL”图标。在弹出的窗口中点击“Stop MySQL Server”按钮，这会使MySQL服务停止运行。</p><p>接下来，在终端中输入以下命令：</p><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /usr/local/mysql/bin/mysqld_safe</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --skip-grant-tables</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">mysql</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -u</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> root</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">mysql</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">&gt; </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">FLUSH</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> PRIVILEGES</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">mysql</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">&gt; </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">ALTER</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> USER</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">root</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">@</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">localhost</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> IDENTIFIED</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> BY</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">new_password</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">mysql</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">&gt; </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">exit</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12)]))}const p=i(l,[["render",t],["__file","index.html.vue"]]),r=JSON.parse('{"path":"/article/qmbjkv0y/","title":"服务器相关问题","lang":"zh-CN","frontmatter":{"title":"服务器相关问题","tags":["笔记","指令"],"createTime":"2023/10/31","permalink":"/article/qmbjkv0y/","description":"ubuntu docker docker mysql mysql容器添加vim mac重置mysql密码 方法一：使用系统偏好设置 首先打开系统偏好设置，然后点击“MySQL”图标。在弹出的窗口中点击“Stop MySQL Server”按钮，这会使MySQL服务停止运行。 接下来，在终端中输入以下命令：","head":[["meta",{"property":"og:url","content":"https://jyqwq.github.io/rainbow/article/qmbjkv0y/"}],["meta",{"property":"og:site_name","content":"纸上的彩虹"}],["meta",{"property":"og:title","content":"服务器相关问题"}],["meta",{"property":"og:description","content":"ubuntu docker docker mysql mysql容器添加vim mac重置mysql密码 方法一：使用系统偏好设置 首先打开系统偏好设置，然后点击“MySQL”图标。在弹出的窗口中点击“Stop MySQL Server”按钮，这会使MySQL服务停止运行。 接下来，在终端中输入以下命令："}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"笔记"}],["meta",{"property":"article:tag","content":"指令"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"服务器相关问题\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":0.77,"words":232},"git":{},"autoDesc":true,"filePathRelative":"其他/服务器相关问题.md","categoryList":[{"id":"0d98c7","sort":10002,"name":"其他"}],"bulletin":false}');export{p as comp,r as data};