/* ============================================================
   ЖАР///ДЫМ — общий скрипт
   1) бургер-меню
   2) переключатель способа связи в формах
   3) калькулятор-квиз на 8 шагов
   ============================================================ */

/* ---------- 1. Бургер-меню ---------- */
(function () {
  var burger = document.querySelector('[data-burger]');
  var menu = document.querySelector('[data-menu]');
  if (!burger || !menu) return;

  function toggle(open) {
    menu.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  burger.addEventListener('click', function () {
    toggle(!menu.classList.contains('is-open'));
  });

  menu.addEventListener('click', function (e) {
    if (e.target.closest('a') || e.target.closest('[data-menu-close]')) toggle(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') toggle(false);
  });
})();

/* ---------- 2. Переключатели «как с вами связаться» ---------- */
(function () {
  document.querySelectorAll('[data-switch]').forEach(function (group) {
    var out = document.getElementById(group.dataset.switch);
    group.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      group.querySelectorAll('button').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
      });
      if (out) {
        out.value = btn.dataset.value || btn.textContent.trim();
        var input = document.getElementById(group.dataset.target || '');
        if (input) {
          input.placeholder = btn.dataset.placeholder || input.placeholder;
          input.type = btn.dataset.type || 'text';
        }
      }
    });
  });
})();

/* ============================================================
   3. КАЛЬКУЛЯТОР
   Все вопросы и варианты лежат здесь — правьте прямо в этом массиве.
   type: 'one'  — один вариант, шаг листается сразу после клика
         'many' — можно выбрать несколько, листаем кнопкой «Далее»
         'many' + limit — не больше N вариантов
   img — путь к картинке варианта (если не указан, картинки нет)
   ============================================================ */
var QUIZ = [
  {
    title: 'Сколько человек будет париться одновременно?',
    hint: 'Совет: берите с запасом — свободное пространство делает парение комфортнее.',
    type: 'one',
    options: [
      { t: 'Маленький', d: 'до 4 человек — компактный вариант для семьи или пары' },
      { t: 'Средний', d: 'до 6 человек — оптимально для дружеских посиделок' },
      { t: 'Большой', d: 'до 9 человек — просторный чан для большой компании' },
      { t: 'Макси', d: 'до 12 человек — максимум для мероприятий и банных комплексов' }
    ]
  },
  {
    title: 'Материал чаши',
    type: 'one',
    options: [
      { t: 'Нержавеющая сталь AISI 430', d: 'прочная и надёжная, отлично держит тепло. Проверенный выбор по разумной цене' },
      { t: 'Нержавеющая сталь AISI 304', d: 'премиальная марка, повышенная стойкость к коррозии. Служит дольше и сохраняет вид на десятилетия' }
    ]
  },
  {
    title: 'Отделка внутри чаши',
    type: 'one',
    options: [
      { t: 'Стандарт', d: 'аккуратная базовая отделка — всё для комфортного парения', img: 'images/quiz/otdelka-standart.jpg', ph: 'Фото: отделка Стандарт' },
      { t: 'Стандарт плюс', d: 'улучшенная обработка поверхности, приятнее тактильно и визуально', img: 'images/quiz/otdelka-standart-plus.jpg', ph: 'Фото: отделка Стандарт плюс' },
      { t: 'Премиум', d: 'качественные материалы и тщательная отделка, повышенный комфорт', img: 'images/quiz/otdelka-premium.jpg', ph: 'Фото: отделка Премиум' },
      { t: 'Люкс', d: 'максимальный уровень: премиальные материалы и безупречный вид', img: 'images/quiz/otdelka-lux.jpg', ph: 'Фото: отделка Люкс' }
    ]
  },
  {
    title: 'Тип подогрева',
    type: 'one',
    options: [
      { t: 'Стационарная печь', d: 'классика, внутри чана — быстрый нагрев', img: 'images/quiz/pech-stacionarnaya.jpg', ph: 'Фото: стационарная печь' },
      { t: 'Печь-подставка', d: 'располагается под чашей, экономит внутреннее пространство', img: 'images/quiz/pech-podstavka.jpg', ph: 'Фото: печь-подставка' },
      { t: 'Печь с водяным контуром', d: 'равномерный прогрев воды по всему объёму', img: 'images/quiz/pech-vodyanoy-kontur.jpg', ph: 'Фото: печь с водяным контуром' },
      { t: 'Печь выносная', d: 'топка снаружи — внутри больше места и меньше дыма', img: 'images/quiz/pech-vynosnaya.jpg', ph: 'Фото: выносная печь' },
      { t: 'Печь приварная боковая', d: 'крепится сбоку, удобна в обслуживании, сохраняет объём', img: 'images/quiz/pech-bokovaya.jpg', ph: 'Фото: боковая печь' }
    ]
  },
  {
    title: 'Дымоход',
    type: 'one',
    options: [
      { t: 'Дымоход 3 м + защитный экран', d: 'высокая тяга и защита от случайных ожогов', img: 'images/quiz/dymohod-3m.jpg', ph: 'Фото: дымоход 3 м' },
      { t: 'Дымоход 2 м + сэндвич-вставка 1 м', d: 'утеплённая вставка снижает нагрев трубы — безопаснее и аккуратнее', img: 'images/quiz/dymohod-sendvich.jpg', ph: 'Фото: дымоход с сэндвич-вставкой' }
    ]
  },
  {
    title: 'Лестница',
    type: 'one',
    options: [
      { t: 'Металлическая прямая', d: 'простой и надёжный вход в чан', img: 'images/quiz/lestnica-pryamaya.jpg', ph: 'Фото: прямая лестница' },
      { t: 'Металлокаркасная с площадкой и поручнем', d: 'удобный и безопасный подъём с опорой', img: 'images/quiz/lestnica-ploshadka.jpg', ph: 'Фото: лестница с площадкой' },
      { t: 'С площадкой и крючками под халаты', d: 'то же удобство плюс место, куда повесить вещи', img: 'images/quiz/lestnica-kryuchki.jpg', ph: 'Фото: лестница с крючками' }
    ]
  },
  {
    title: 'Дополнительные элементы',
    sub: 'Отметьте всё, что хотите добавить (можно несколько)',
    type: 'many',
    options: [
      { t: 'Термочехол', d: 'сохраняет тепло и ускоряет нагрев' },
      { t: 'Жёсткая термокрышка', d: 'держит температуру и защищает воду от мусора' },
      { t: 'Деревянная крышка', d: 'эстетично, также сохраняет тепло' },
      { t: 'Стол по центру', d: 'для напитков и закусок прямо во время парения' },
      { t: 'Стол боковой', d: 'дополнительная поверхность рядом с чаном' },
      { t: 'Хромотерапия (подсветка)', d: 'цветная подсветка воды для атмосферы' },
      { t: 'Мягкий подголовник', d: 'комфортная опора для головы и шеи' },
      { t: 'Джакузи', d: 'пузырьковый массаж и релакс' },
      { t: 'Гидро-аэромассаж', d: 'массаж воздушными и водяными потоками' },
      { t: 'Логотип на чашу', d: 'индивидуальное оформление, актуально для бизнеса' },
      { t: 'Закалённое стекло в печь', d: 'любоваться живым огнём, повышенная прочность' },
      { t: 'Газовая горелка для печи', d: 'альтернатива дровам, удобнее в розжиге' }
    ]
  },
  {
    title: 'Подарок в комплект',
    sub: 'Выберите 2 бонуса',
    type: 'many',
    limit: 2,
    options: [
      { t: 'Кочерга для печи 120 см', d: 'управлять дровами, не обжигаясь' },
      { t: 'Термометр-поплавок', d: 'всегда знаете точную температуру воды' },
      { t: 'Пихтовый веник', d: 'ароматный и полезный аксессуар для парения' },
      { t: 'Банный набор (шапка и масло)', d: 'всё для приятного банного ритуала' }
    ]
  }
];

(function () {
  var root = document.querySelector('[data-quiz]');
  if (!root) return;

  var bar = root.querySelector('[data-quiz-bar]');
  var count = root.querySelector('[data-quiz-count]');
  var body = root.querySelector('[data-quiz-body]');

  var step = 0;
  var answers = QUIZ.map(function (q) { return q.type === 'many' ? [] : null; });

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function icoBack() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>';
  }
  function icoNext() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
  }

  function renderProgress(done) {
    var pct = done ? 100 : ((step) / QUIZ.length) * 100;
    if (bar) bar.style.width = pct + '%';
    if (count) count.textContent = done ? 'Готово' : 'Шаг ' + (step + 1) + ' из ' + QUIZ.length;
  }

  function optionHTML(opt, i, picked) {
    var img = opt.img
      ? '<div class="ph opt__img" style="--img:url(\'' + opt.img + '\')" data-ph="' + esc(opt.ph || opt.t) + '"></div>'
      : '';
    return '<button type="button" class="opt' + (picked ? ' is-picked' : '') + '" data-i="' + i + '">' +
      img +
      '<b>' + esc(opt.t) + '</b>' +
      '<span>' + esc(opt.d) + '</span>' +
      '</button>';
  }

  function render() {
    var q = QUIZ[step];
    renderProgress(false);

    var chosen = answers[step];
    var picked = q.type === 'many' ? chosen : [chosen];

    var sub = '';
    if (q.sub) {
      sub = '<p class="quiz__sub">' + esc(q.sub) +
        (q.limit ? ' · выбрано ' + chosen.length + ' из ' + q.limit : '') + '</p>';
    }

    var nextDisabled = q.type === 'many' && q.limit && chosen.length !== q.limit;

    body.innerHTML =
      '<h3 class="quiz__q">' + esc(q.title) + '</h3>' +
      (q.hint ? '<p class="quiz__hint">' + esc(q.hint) + '</p>' : '') +
      sub +
      '<div class="quiz__options" data-opts>' +
        q.options.map(function (o, i) {
          return optionHTML(o, i, picked.indexOf(i) !== -1);
        }).join('') +
      '</div>' +
      '<div class="quiz__nav">' +
        '<button type="button" class="quiz__back" data-back' + (step === 0 ? ' hidden' : '') + '>' +
          icoBack() + 'Назад</button>' +
        (q.type === 'many'
          ? '<button type="button" class="btn btn--gold" data-next' + (nextDisabled ? ' disabled' : '') + '>' +
            (step === QUIZ.length - 1 ? 'Готово' : 'Далее') + icoNext() + '</button>'
          : '<span></span>') +
      '</div>';
  }

  function renderResult() {
    step = QUIZ.length;
    renderProgress(true);

    var rows = QUIZ.map(function (q, qi) {
      var a = answers[qi];
      var val;
      if (q.type === 'many') {
        val = a.length ? a.map(function (i) { return q.options[i].t; }).join(', ') : '—';
      } else {
        val = a === null ? '—' : q.options[a].t;
      }
      return '<div class="summary__row"><dt>' + esc(q.title) + '</dt><dd>' + esc(val) + '</dd></div>';
    }).join('');

    var plain = QUIZ.map(function (q, qi) {
      var a = answers[qi];
      var val = q.type === 'many'
        ? a.map(function (i) { return q.options[i].t; }).join(', ')
        : (a === null ? '' : q.options[a].t);
      return q.title + ': ' + val;
    }).join('\n');

    body.innerHTML =
      '<h3 class="quiz__q">Комплектация собрана</h3>' +
      '<p class="quiz__sub">Оставьте контакт — менеджер посчитает точную стоимость и пришлёт расчёт в удобный мессенджер.</p>' +
      '<div class="quiz-result">' +
        '<dl class="summary">' + rows + '</dl>' +
        '<form class="quiz-form" data-quiz-form>' +
          '<div class="switch" data-switch="quiz-channel" data-target="quiz-contact">' +
            '<button type="button" class="is-active" data-value="Телефон" data-placeholder="+7 (___) ___-__-__" data-type="tel">Телефон</button>' +
            '<button type="button" data-value="Telegram" data-placeholder="@username" data-type="text">Telegram</button>' +
            '<button type="button" data-value="Почта" data-placeholder="you@mail.ru" data-type="email">Почта</button>' +
          '</div>' +
          '<input type="hidden" id="quiz-channel" name="channel" value="Телефон">' +
          '<input type="hidden" name="komplektaciya" value="' + esc(plain) + '">' +
          '<div class="field"><input class="input" id="quiz-contact" name="contact" type="tel" placeholder="+7 (___) ___-__-__" required></div>' +
          '<button type="submit" class="btn btn--gold btn--block">Получить расчёт</button>' +
          '<p class="form-note">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>' +
        '</form>' +
      '</div>' +
      '<div class="quiz__nav">' +
        '<button type="button" class="quiz__back" data-back>' + icoBack() + 'Изменить ответы</button>' +
        '<span></span>' +
      '</div>';
  }

  root.addEventListener('click', function (e) {
    var opt = e.target.closest('.opt');
    var back = e.target.closest('[data-back]');
    var next = e.target.closest('[data-next]');

    if (back) {
      step = Math.max(0, step - 1);
      render();
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (next) {
      if (step === QUIZ.length - 1) renderResult();
      else { step++; render(); }
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (opt) {
      var q = QUIZ[step];
      var i = Number(opt.dataset.i);

      if (q.type === 'many') {
        var arr = answers[step];
        var at = arr.indexOf(i);
        if (at !== -1) arr.splice(at, 1);
        else if (!q.limit || arr.length < q.limit) arr.push(i);
        render();
      } else {
        answers[step] = i;
        if (step === QUIZ.length - 1) renderResult();
        else { step++; render(); }
        root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  root.addEventListener('submit', function (e) {
    if (!e.target.matches('[data-quiz-form]')) return;
    e.preventDefault();
    /* TODO: сюда подставить отправку на почту / в CRM */
    body.innerHTML =
      '<h3 class="quiz__q">Заявка отправлена</h3>' +
      '<p class="quiz__sub">Спасибо! Менеджер свяжется с вами в течение рабочего дня и пришлёт расчёт вашей комплектации.</p>';
    renderProgress(true);
  });

  render();
})();
