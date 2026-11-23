(function () {
  "use strict";

  var DIMS = [
    { name: "主动度", notes: ["先开口的多半是你", "你们推得还算均匀", "他会主动找上你"] },
    { name: "亲密度", notes: ["话题还停在安全区", "聊得来，但留了余地", "你们已经聊到很私人的地方"] },
    { name: "唯一性", notes: ["你暂时还不是那个例外", "有点特别，但不够确定", "他对你明显不一样"] },
    { name: "未来感", notes: ["还没人提到「以后」", "有暗示，没有计划", "他的话里已经把你带进去了"] }
  ];

  var Q = [
    /* ---- 主动度 0 ---- */
    { d: 0, q: "最近这一周，你们的聊天通常是谁先开口？", o: [
      "几乎每次都是我先说话",
      "我先开口更多",
      "交替着来，差不多",
      "他先开口更多，甚至会没头没尾突然冒出来"
    ]},
    { d: 0, q: "他回你的速度，跟他回别人的速度比——", o: [
      "没对比过，但总觉得他回我很慢",
      "和其他人差不多，没什么特别",
      "明显快一点",
      "几乎秒回，或者会主动解释为什么回晚了"
    ]},
    { d: 0, q: "你发一条没什么正经事的消息（比如随手拍的天空），他一般——", o: [
      "已读不回，或者隔很久回一个表情",
      "回一个不冷不热的字",
      "会顺着你的话往下聊",
      "会接住这个话题，还自己再抛一个回来"
    ]},
    { d: 0, q: "聊天断了之后，重新接起来的方式通常是——", o: [
      "基本都是我另起一个头",
      "我找机会「恰巧」发点什么",
      "他偶尔会突然冒出来一句",
      "三天之内他一定会主动找我一次"
    ]},
    { d: 0, q: "他会主动跟你分享一件和你无关、只是他自己的事吗？", o: [
      "从来没有，都是我问他才答",
      "很少，要我先问",
      "偶尔，比如他加班了会跟我说一声",
      "经常，今天吃什么都会发给我看"
    ]},
    { d: 0, q: "出门前，他会不会对你的样子有反应？", o: [
      "从没提过",
      "会说你今天挺好看",
      "会注意到细节，比如「换发色了」",
      "会主动要我发照片，或者问我今天穿什么"
    ]},
    { d: 0, q: "群里聊天的时候，他对你的态度——", o: [
      "和所有人一样，看不出差别",
      "会接我的话，但不特别",
      "对我明显比在私下更活跃",
      "会单独 @我，或者把群里的话挪到私聊继续说"
    ]},
    { d: 0, q: "你们的对话里，「下次」这个词出现过吗？", o: [
      "没有",
      "我说过，他嗯了一声就过去了",
      "他说过，但没说具体",
      "他说过，而且说了具体的时间和地点"
    ]},
    { d: 0, q: "如果他一天没回你消息，通常的剧情是——", o: [
      "我会忍不住再问一句",
      "我会不高兴，但装作没有",
      "我等着，他晚上一定会回",
      "他会先自己解释一句「刚在忙」"
    ]},
    { d: 0, q: "他有没有「没事找事」地给你发过消息？比如一首歌、一个烂梗图。", o: [
      "从来没有",
      "偶尔，一看就是群发那种",
      "会，但不太多",
      "经常，一天能来好几条"
    ]},

    /* ---- 亲密度 1 ---- */
    { d: 1, q: "你们聊天最晚聊到过几点？", o: [
      "十一点前基本就结束了",
      "十二点左右",
      "凌晨一两点",
      "聊到三四点，第二天还在接着聊"
    ]},
    { d: 1, q: "他跟你讲过家里的糟心事吗？", o: [
      "没有，连他父母什么情况我都不知道",
      "提过一两句",
      "讲过具体的矛盾和烦恼",
      "讲过很私人的事，他说从没跟别人讲过"
    ]},
    { d: 1, q: "你们之间有只有两个人才懂的东西吗？", o: [
      "没有，都是很正常的对话",
      "有一两个共同的梗",
      "有只有我们才懂的暗号",
      "我们有「那件事」，别人都不知道"
    ]},
    { d: 1, q: "他会在你面前露弱吗——累、丧、丢脸的那种？", o: [
      "只谈他做得好的事",
      "偶尔抱怨两句",
      "会跟我讲他的低落",
      "会在我面前露出很脆弱的一面"
    ]},
    { d: 1, q: "你们的聊天里，有多大比例是没什么用的废话？", o: [
      "几乎没有，都是有事说事",
      "三成左右",
      "一半以上",
      "基本全是废话，正事一句话就说完了"
    ]},
    { d: 1, q: "他会记得你自己都忘了的细节吗？", o: [
      "不会，我说过的话他都记不清",
      "大事记得，小事不记得",
      "会记得我说过的一些小事",
      "会记得我随口提过的日期、口味、讨厌的东西"
    ]},
    { d: 1, q: "你们有过身体上的接触吗？", o: [
      "没有，一直保持礼貌距离",
      "有过一次很偶然的",
      "有牵手、靠肩、拥抱这类自然的接触",
      "有明确带着暧昧意味的碰触，而且谁都没避开"
    ]},
    { d: 1, q: "他问过你的过去吗——前任、家里、从前受过的事。", o: [
      "没有",
      "问过一两句，没往下聊",
      "认真问过，也听我说完",
      "问得很细，还会说「以后不会那样」"
    ]},
    { d: 1, q: "你说过「我今天很难受」之类的信号吗，他当时——", o: [
      "没说过，也没必要说",
      "说了，他回了句「怎么了」就没下文",
      "他会打电话过来",
      "他会出现在我面前"
    ]},
    { d: 1, q: "你们面对面时，能一起安静坐着而不尴尬吗？", o: [
      "没怎么单独待过",
      "有，但那种安静很尴尬",
      "能，安静着也不难受",
      "能，而且那种安静里明显有东西"
    ]},

    /* ---- 唯一性 2 ---- */
    { d: 2, q: "他身边还有别的暧昧对象吗？", o: [
      "有，而且我很确定",
      "可能有，我不清楚",
      "应该没有，但我不敢肯定",
      "确定没有，我是唯一那个"
    ]},
    { d: 2, q: "他提起别的异性时，你的真实感受是——", o: [
      "他经常提，我很难受",
      "会提，我只能装作不在意",
      "很少提",
      "几乎不提，偶尔提还会补一句「就是同事」"
    ]},
    { d: 2, q: "他有没有为你破过例？本来不看的电影、不去的地方、不熬的夜。", o: [
      "没有",
      "不太确定，好像没有",
      "有过小破例",
      "有过很明确的，他说换别人他不会"
    ]},
    { d: 2, q: "他给你的优先级，和你给他的比——", o: [
      "我对他比对谁都上心，他对我很一般",
      "差不多",
      "我感觉得到他的在意",
      "他忙得要死的时候，还是会抽时间回我"
    ]},
    { d: 2, q: "这段关系，他愿意让多少人知道？", o: [
      "只在私下，公开场合装作不熟",
      "群里正常互动，除此以外没有",
      "他的朋友知道我这个人",
      "他会把我介绍给他的朋友，带我出现在他常去的地方"
    ]},
    { d: 2, q: "他会在意你和其他人相处吗？", o: [
      "完全不在意",
      "会开一句玩笑就过去了",
      "感觉得到他在意，但他不说",
      "他会明确表现出不舒服，甚至吃醋"
    ]},
    { d: 2, q: "他在你面前说过「我暂时不想谈恋爱」吗？", o: [
      "说过，说得很明确",
      "隐约提过",
      "没提过",
      "说过相反的话，比如「想找个人定下来」"
    ]},
    { d: 2, q: "如果他明天恋爱了，会第一个告诉你吗？", o: [
      "不会，我大概会从别人口中听说",
      "会，但也只是顺口一提",
      "会提前跟我说",
      "不可能发生，因为他不会跟别人在一起"
    ]},
    { d: 2, q: "他为你花过超出日常的时间和心思吗？不算 AA 那种。", o: [
      "没有",
      "有过一点，但都很随意",
      "有过特意安排的",
      "有过明显超出朋友范围的付出"
    ]},
    { d: 2, q: "你们之间，谁更怕失去谁？", o: [
      "我怕，他无所谓",
      "我怕得多一些",
      "说不清",
      "他更怕，因为他确认不了我的态度"
    ]},

    /* ---- 未来感 3 ---- */
    { d: 3, q: "他提过「以后」吗？以后一起去、以后你怎样之类的。", o: [
      "没有",
      "我说过，他没接",
      "他说过，但听起来像玩笑",
      "他说过，而且说到了很具体的以后"
    ]},
    { d: 3, q: "你在聊未来的事时，他的反应是——", o: [
      "我基本不提",
      "我提了，他绕开",
      "他会顺着聊两句",
      "他会主动加入，甚至问「那我呢」"
    ]},
    { d: 3, q: "你们有过「像约会」却没说破的场合吗？", o: [
      "没有，都是正常场合",
      "有过一次，但人很多",
      "单独吃过饭、看过电影",
      "有过很多次，而且双方都在装傻"
    ]},
    { d: 3, q: "关于生日、圣诞、跨年这种日子，他——", o: [
      "没提过",
      "发了条祝福",
      "送了东西，或者约了见面",
      "提前很久就问我打算怎么过"
    ]},
    { d: 3, q: "他试探过你的态度吗？比如问「你喜欢什么类型」。", o: [
      "没有",
      "开玩笑一样问过",
      "认真问过",
      "问过之后，明显在往那个方向靠"
    ]},
    { d: 3, q: "你们中间隔着的那层窗户纸，是谁在装作看不见？", o: [
      "我根本不确定那是不是窗户纸",
      "是我一个人在装看不见",
      "两个人都在装，但彼此都知道",
      "他也在装，而且装得比我还辛苦"
    ]},
    { d: 3, q: "现在有人当面问「你们在一起了吗」，他会怎么答？", o: [
      "会直接否认",
      "会说「就是朋友」",
      "会含糊地笑一下",
      "会说「还没」——注意这个「还没」"
    ]},
    { d: 3, q: "你们最近一次见面之后，他提过下次吗？", o: [
      "没有",
      "说了句客套的「回头约」",
      "他会自己找理由再约一次",
      "他当天就把下一次定下来了"
    ]},
    { d: 3, q: "你心里最怕的那个结局是什么？", o: [
      "他其实从没把我当回事",
      "他只是享受被喜欢的感觉",
      "我们错过了，那句话来不及说",
      "在一起之后，我还是会失去他"
    ]},
    { d: 3, q: "如果你现在直接告诉他「我喜欢你」，你猜他会——", o: [
      "会躲，会尴尬，然后慢慢淡掉",
      "会说「我一直当你是朋友」",
      "会沉默很久，然后说「给我点时间」",
      "会说「我以为你早就知道了」"
    ]}
  ];

  var TIERS = [
    { max: 28, title: "火苗还没起来", verdict: "他不是没看见你，是没往那个方向看。",
      notes: [
        "你在这段关系里投入的注意力，明显多于他。多数时候那不是暧昧，是你在替他的沉默找解释。",
        "真正的信号是「他为你多做了一件事」，不是「他对你还算客气」。这两者差得很远。"
      ],
      tips: [
        "连着三次都是你先开口之后，停一周。不是赌气，是看这段关系自己会不会呼吸。",
        "把「他今天没回我」从一件情绪事件，降级成一个事实：他忙，仅此而已。",
        "给自己开一条新的线。不是为了让他紧张，是把注意力从一个人身上挪开一点。"
      ]},
    { max: 48, title: "有温度，但还烧不起来", verdict: "你们之间有真实的亲近感，缺的是方向。",
      notes: [
        "聊得舒服不是证据。人对「安全的人」也会很舒服，但不会因此心动。",
        "要看的只有一件事：他有没有为你多走一步——多花一次时间、破一次例、说一句本不必说的话。"
      ],
      tips: [
        "制造一次只有你们两个人的场合，不谈工作、不谈别人，看他怎么处理那几分钟的沉默。",
        "把试探换成明确。「周六我有两张票，你来不来」比「你最近有空吗」有效一百倍。",
        "在你拒绝他一次之后，观察他的反应。真正在意的人会重来一次。"
      ]},
    { max: 66, title: "临界点，只差一句话", verdict: "所有该出现的信号都出现过，只是没人把它们连成一条线。",
      notes: [
        "你们已经在用恋人的方式相处，却还在用朋友的名义解释自己。",
        "这种状态有保质期。拖过最烫的那段时间，人会开始给自己找退路，然后说服自己「其实也没那么喜欢」。"
      ],
      tips: [
        "别再等完美时机。完美时机是暧昧里最好用的托词。",
        "选一次见面快结束、气氛还热的时候说。不要选在深夜的聊天框里。",
        "只说自己的感受，不要追问「你到底怎么想」。你负责把话说清楚，他负责给答案。"
      ]},
    { max: 84, title: "大概率在一起，只等一个人先开口", verdict: "这不是「会不会」的问题，是「谁先说」的问题。",
      notes: [
        "他给你的待遇，不像是在给一个普通朋友。你心里其实早就知道，只是不敢确认。",
        "继续拖下去的代价，比说出来被拒绝的代价更高——因为他也在等你。"
      ],
      tips: [
        "找一次见面，把话说明白，一句就够。不用设计场景，不用铺垫。",
        "如果他退了，那也是答案。比你现在的悬着，划算得多。",
        "顺便分清：你怕的是「他不喜欢我」，还是「被拒绝」这件事本身。这两个是不同的麻烦。"
      ]},
    { max: 120, title: "几乎已经在一起了", verdict: "你们缺的不是感情，是一个名分。",
      notes: [
        "按你的选择，他已经把你放进了「我的人」这个范围里，只是还没说出来。",
        "这种事实关系最大的风险不是失败，是无限延期。总有一天你们会累，会以为彼此只是习惯。"
      ],
      tips: [
        "直接说。别等节日，别等某个特别的日子，那些都是拖延的借口。",
        "说完要一个明确的回答，不接受「再等等」「顺其自然」。",
        "成了就说出去，让身边人知道。模糊的关系最怕没有见证。"
      ]}
  ];

  var RING_C = 2 * Math.PI * 86;

  var answers = new Array(Q.length).fill(null);
  var idx = 0;
  var locked = false;
  var lastP = 0;
  var lastTier = null;

  function el(id) { return document.getElementById(id); }

  function show(name) {
    el("cover").classList.toggle("hidden", name !== "cover");
    el("quiz").classList.toggle("hidden", name !== "quiz");
    el("result").classList.toggle("hidden", name !== "result");
  }

  function startQuiz() {
    answers = new Array(Q.length).fill(null);
    idx = 0;
    locked = false;
    show("quiz");
    renderQ(0);
    window.scrollTo(0, 0);
  }

  function renderQ(dir) {
    var q = Q[idx];
    el("qIndex").textContent = "第 " + (idx + 1) + " / " + Q.length + " 题";
    el("qDim").textContent = DIMS[q.d].name;
    el("bar").style.width = ((idx + 1) / Q.length * 100) + "%";
    el("qText").textContent = q.q;
    el("btnPrev").disabled = idx === 0;

    var box = el("opts");
    box.innerHTML = "";
    var letters = ["A", "B", "C", "D"];
    q.o.forEach(function (text, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "opt" + (answers[idx] === i ? " sel" : "");
      b.innerHTML = '<span class="mark">' + letters[i] + "</span><span>" + text + "</span>";
      b.addEventListener("click", function () { pick(i); });
      box.appendChild(b);
    });

    var body = el("qBody");
    body.classList.remove("fade");
    void body.offsetWidth;
    body.classList.add("fade");
  }

  function pick(v) {
    if (locked) return;
    locked = true;
    answers[idx] = v;

    var nodes = el("opts").children;
    for (var k = 0; k < nodes.length; k++) {
      nodes[k].classList.toggle("sel", k === v);
    }

    setTimeout(function () {
      locked = false;
      if (idx < Q.length - 1) {
        idx++;
        renderQ(1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        finish();
      }
    }, 190);
  }

  function prev() {
    if (idx === 0 || locked) return;
    idx--;
    renderQ(-1);
  }

  function finish() {
    if (answers.indexOf(null) !== -1) {
      var miss = answers.indexOf(null);
      idx = miss;
      renderQ(0);
      return;
    }
    var dim = [0, 0, 0, 0];
    var total = 0;
    Q.forEach(function (q, i) {
      dim[q.d] += answers[i];
      total += answers[i];
    });

    var p = Math.round(5 + (total / (Q.length * 3)) * 90);
    lastP = p;

    var tier = TIERS[TIERS.length - 1];
    for (var i = 0; i < TIERS.length; i++) {
      if (p <= TIERS[i].max) { tier = TIERS[i]; break; }
    }
    lastTier = tier;

    show("result");
    el("tierTitle").textContent = tier.title;
    el("verdict").textContent = tier.verdict;

    el("notes").innerHTML = "";
    tier.notes.forEach(function (n) {
      var li = document.createElement("li");
      li.textContent = n;
      el("notes").appendChild(li);
    });

    el("tipsList").innerHTML = "";
    tier.tips.forEach(function (t) {
      var li = document.createElement("li");
      li.textContent = t;
      el("tipsList").appendChild(li);
    });

    var dims = el("dims");
    dims.innerHTML = "";
    DIMS.forEach(function (d, i) {
      var pct = Math.round(dim[i] / 30 * 100);
      var note = pct < 50 ? d.notes[0] : (pct < 75 ? d.notes[1] : d.notes[2]);
      var row = document.createElement("div");
      row.className = "dim-row";
      row.innerHTML =
        '<span class="dim-name">' + d.name + "</span>" +
        '<span class="dim-bar"><i></i></span>' +
        '<span class="dim-note">' + note + "　" + pct + "%</span>";
      dims.appendChild(row);
      var bar = row.querySelector("i");
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { bar.style.width = pct + "%"; });
      });
    });

    var bar = el("gaugeBar");
    bar.style.strokeDasharray = RING_C;
    bar.style.strokeDashoffset = RING_C;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        bar.style.strokeDashoffset = RING_C * (1 - p / 100);
      });
    });

    countUp(el("num"), p, 1200);
    window.scrollTo(0, 0);
  }

  function countUp(node, to, dur) {
    var t0 = performance.now();
    function step(t) {
      var k = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - k, 3);
      node.textContent = Math.round(to * e);
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function toast(msg) {
    var t = el("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove("show"); }, 2000);
  }

  function copyResult() {
    if (!lastTier) return;
    var txt = "我在「你和暧昧对象多大概率在一起」测出了 " + lastP + "% —— " + lastTier.title + "\n" + lastTier.verdict;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () {
        toast("已复制到剪贴板");
      }).catch(function () {
        toast("复制失败，可长按文字手动选取");
      });
    } else {
      toast("当前浏览器不支持复制，可长按文字手动选取");
    }
  }

  el("btnStart").addEventListener("click", startQuiz);
  el("btnPrev").addEventListener("click", prev);
  el("btnRetry").addEventListener("click", startQuiz);
  el("btnCopy").addEventListener("click", copyResult);

  document.addEventListener("keydown", function (e) {
    if (el("quiz").classList.contains("hidden")) return;
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= 4) { e.preventDefault(); pick(n - 1); return; }
    if (e.key === "ArrowLeft" || e.key === "Backspace") { e.preventDefault(); prev(); }
  });
})();