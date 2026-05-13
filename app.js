const SAVE_ENDPOINT = "/save-step";
const STORAGE_KEY = "skillbox_diagnostic_state_v2";
const QUEUE_KEY = "skillbox_diagnostic_save_queue_v2";
const SKILLBOX_LOGO_URL = "https://cdn.skillbox.pro/wbd-front/skillbox-static/skillbox-white.svg";
const WELCOME_VISUAL_URL = "https://cdn.skillbox.pro/wbd-front/skillbox-static/main-page-new/service/card/card-2-sm@1x.png";
const GLASS_CRACK_TARGET = 10;

const scoreKeys = [
  "burnout",
  "stress",
  "overload",
  "work_link",
  "growth",
  "future_anxiety",
  "money_freedom",
  "boredom",
  "exploration",
  "misfit",
  "unclear",
  "low_risk",
  "soft_transition",
  "environment_mismatch",
  "environment_fit",
  "remote_need",
  "self_efficacy",
  "balance_need",
  "autonomy_need",
  "high_intent",
  "stable_change",
  "identity_shift",
  "burnout_recovery",
];

const emptyScore = () => Object.fromEntries(scoreKeys.map((key) => [key, 0]));

const emptyProfile = () => ({
  name: "",
  generation: "",
  selectedFeelings: [],
  bodySignals: [],
  colorOrder: [],
  positiveContexts: [],
  negativeContexts: [],
  dayLinePattern: "",
  batteryDrainers: [],
  longTermPain: "",
  futureDesires: [],
  normalWork: {
    rhythm: "",
    format: "",
    tasks: [],
    mainValue: "",
  },
  antiCriteria: [],
  criteria: [],
  changeMode: "",
  nextChapterItems: [],
  outcome: "",
});

const generationCards = [
  { id: "baby_boomers", title: "Бейбибумеры", years: "1946-1964", tone: "lime" },
  { id: "gen_x", title: "Поколение X", years: "1965-1980", tone: "pink" },
  { id: "millennials", title: "Миллениалы", years: "1981-1996", tone: "violet" },
  { id: "zoomers", title: "Зумеры", years: "1997-2012", tone: "black" },
];

const emotionalOptions = [
  "усталость",
  "тревога",
  "раздражение",
  "пустота",
  "скука",
  "потерянность",
  "сомнения",
  "растерянность",
  "страх перемен",
  "неуверенность",
  "напряжение",
  "тревога за будущее",
  "бессилие",
  "перегруз",
  "вымотанность",
  "апатия",
  "одиночество",
  "давление",
  "прокрастинация",
  "неудовлетворенность",
];

const physicalOptions = [
  "сложно просыпаться",
  "тяжесть в теле",
  "плохой сон",
  "всё делаю через силу",
  "сложно включиться в дела",
  "хочется лежать",
  "нет сил на людей",
  "сложно расслабиться",
  "ком в горле",
  "сжатая челюсть",
  "напряжение в плечах",
  "не хватает дыхания",
  "быстро устаю",
  "залипаю в телефон",
  "хочется спрятаться",
  "срываюсь на близких",
];

const colorOptions = [
  { id: "blue", title: "синий", value: "#3d3bff" },
  { id: "green", title: "зеленый", value: "#24b36b" },
  { id: "red", title: "красный", value: "#ff4f4f" },
  { id: "yellow", title: "желтый", value: "#ffd84a" },
  { id: "violet", title: "фиолетовый", value: "#8c5cff" },
  { id: "brown", title: "коричневый", value: "#8a5a3c" },
  { id: "gray", title: "серый", value: "#9a9aa0" },
  { id: "black", title: "черный", value: "#111111" },
];

const contextCards = [
  "Утро перед рабочим днём",
  "Начало рабочего дня",
  "Рабочие задачи",
  "Созвоны / переписки",
  "Общение с коллегами или клиентами",
  "Вечер после работы",
  "Воскресенье перед понедельником",
  "Мысли о будущем",
  "Мысли о деньгах",
  "Когда вижу успех других",
  "Выходные",
  "Время без телефона",
  "Хобби / свои интересы",
  "Общение с близкими",
  "Время наедине с собой",
];

const batteryCards = [
  "Хаос",
  "Бессмысленные задачи",
  "Однообразие",
  "Нет роста",
  "Люди",
  "Мало денег",
  "Нет свободы",
  "Отсутствие признания",
  "Высокая ответственность",
  "Непонятное будущее",
];

const longPainCards = [
  "Мне давно скучно",
  "Я давно не расту",
  "Я давно устаю сильнее, чем восстанавливаюсь",
  "Я давно хочу больше денег",
  "Я давно думаю, что я не там",
  "Я давно хочу свободы",
  "Я давно не понимаю, чего хочу",
];

const futureDesireCards = [
  "Спокойствие",
  "Энергия",
  "Деньги",
  "Свобода",
  "Интерес",
  "Уверенность",
  "Развитие",
  "Творчество",
  "Стабильность",
  "Смысл",
  "Время на себя",
  "Ощущение “я на своём месте”",
];

const workBuilder = {
  rhythm: ["Спокойный", "Динамичный", "Проектный", "Гибкий"],
  format: ["Удалённо", "Гибрид", "Офис", "Не важно"],
  tasks: ["Анализировать", "Создавать", "Общаться", "Управлять", "Помогать", "Наводить порядок", "Придумывать"],
  mainValue: ["Доход", "Свобода", "Стабильность", "Смысл", "Рост", "Творчество"],
};

const antiCards = [
  "Много созвонов",
  "Срочность и горящие дедлайны",
  "Чёткий график",
  "Однообразные задачи",
  "Отсутствие понятного роста",
  "Зависимость от начальника",
  "Низкий доход",
  "Много общения",
  "Работа без смысла",
  "Нестабильность",
];

const changeModes = [
  {
    title: "Маленький шаг",
    text: "Добавить в жизнь что-то новое без резких перемен.",
    visual: "home",
  },
  {
    title: "Марафон",
    text: "Постепенно перестроить жизнь под себя.",
    visual: "road",
  },
  {
    title: "Полёт на Луну",
    text: "Радикально изменить направление жизни.",
    visual: "moon",
  },
  {
    title: "Пауза",
    text: "Сначала выдохнуть и понять, чего я вообще хочу.",
    visual: "pause",
  },
];

const backpackItems = [
  "Рост дохода",
  "Свободу и гибкость",
  "Ощущение развития",
  "Уверенность в себе",
  "Интерес к тому, что делаю",
  "Стабильность",
  "Баланс жизни и работы",
  "Больше времени на себя и близких",
  "Понимание, куда двигаться дальше",
  "Энергию и мотивацию",
  "Ощущение новых возможностей",
  "Комфортную рабочую среду",
];

const itemIcons = {
  "Рост дохода": "₽",
  "Свободу и гибкость": "↗",
  "Ощущение развития": "↑",
  "Уверенность в себе": "✓",
  "Интерес к тому, что делаю": "✦",
  "Стабильность": "■",
  "Баланс жизни и работы": "⚖",
  "Больше времени на себя и близких": "⌂",
  "Понимание, куда двигаться дальше": "⌁",
  "Энергию и мотивацию": "●",
  "Ощущение новых возможностей": "◎",
  "Комфортную рабочую среду": "◌",
};

const rules = {
  initialFeeling: {
    усталость: { burnout: 1 },
    тревога: { stress: 1, future_anxiety: 1 },
    раздражение: { burnout: 1, stress: 1 },
    пустота: { burnout: 1, misfit: 1 },
    скука: { boredom: 2 },
    потерянность: { unclear: 2 },
    сомнения: { unclear: 1 },
    растерянность: { unclear: 2 },
    "страх перемен": { low_risk: 1, future_anxiety: 1 },
    неуверенность: { self_efficacy: -1, unclear: 1 },
    напряжение: { stress: 2 },
    "тревога за будущее": { future_anxiety: 2 },
    бессилие: { burnout: 2 },
    перегруз: { overload: 2, burnout: 1 },
    вымотанность: { burnout: 2 },
    апатия: { burnout: 1, boredom: 1 },
    давление: { stress: 1, overload: 1 },
    неудовлетворенность: { misfit: 1, growth: 1 },
  },
  bodySignal: {
    "сложно просыпаться": { burnout: 1 },
    "тяжесть в теле": { burnout: 1 },
    "плохой сон": { stress: 1, burnout: 1 },
    "всё делаю через силу": { burnout: 2 },
    "сложно включиться в дела": { burnout: 1 },
    "хочется лежать": { burnout: 1, low_risk: 1 },
    "нет сил на людей": { burnout: 1, environment_mismatch: 1 },
    "сложно расслабиться": { stress: 2 },
    "ком в горле": { stress: 1 },
    "сжатая челюсть": { stress: 1 },
    "напряжение в плечах": { stress: 1 },
    "не хватает дыхания": { stress: 1 },
    "быстро устаю": { burnout: 1 },
    "залипаю в телефон": { stress: 1 },
    "хочется спрятаться": { overload: 1, burnout: 1 },
    "срываюсь на близких": { stress: 1, burnout: 1 },
  },
  contextNegative: {
    "Утро перед рабочим днём": { work_link: 2, burnout: 1 },
    "Начало рабочего дня": { work_link: 2 },
    "Рабочие задачи": { work_link: 2 },
    "Созвоны / переписки": { work_link: 1, environment_mismatch: 1 },
    "Общение с коллегами или клиентами": { environment_mismatch: 2 },
    "Вечер после работы": { work_link: 1, burnout: 1 },
    "Воскресенье перед понедельником": { work_link: 2, future_anxiety: 1 },
    "Мысли о будущем": { future_anxiety: 2, unclear: 1 },
    "Мысли о деньгах": { money_freedom: 2 },
    "Когда вижу успех других": { growth: 2 },
    Выходные: { burnout: 2 },
    "Время без телефона": { stress: 1 },
    "Хобби / свои интересы": { boredom: 1, burnout: 1 },
    "Общение с близкими": { stress: 1 },
    "Время наедине с собой": { unclear: 1, stress: 1 },
  },
  contextPositive: {
    Выходные: { low_risk: 1 },
    "Время без телефона": { low_risk: 1 },
    "Хобби / свои интересы": { exploration: 2 },
    "Общение с близкими": { low_risk: 1 },
    "Время наедине с собой": { autonomy_need: 1 },
    "Когда вижу успех других": { growth: 1 },
    "Мысли о будущем": { growth: 1 },
    "Рабочие задачи": { environment_fit: 1 },
    "Общение с коллегами или клиентами": { environment_fit: 1 },
  },
  dayLine: {
    "Тяжёлый старт": { work_link: 1, burnout: 1, low_risk: 1 },
    "Рабочая яма": { work_link: 2, burnout: 1 },
    "Вечернее обнуление": { burnout: 2, low_risk: 1 },
    "Не восстанавливаюсь": { burnout: 3, stress: 1, low_risk: 2 },
    Качели: { stress: 2, burnout: 1, environment_mismatch: 1 },
    "Ровно, но без подъёма": { boredom: 2, exploration: 1 },
    "Есть энергия": { growth: 1, exploration: 1, burnout: -1 },
  },
  battery: {
    Хаос: { burnout: 2, stress: 1 },
    "Бессмысленные задачи": { misfit: 2 },
    Однообразие: { boredom: 2 },
    "Нет роста": { growth: 3 },
    Люди: { environment_mismatch: 2 },
    "Мало денег": { money_freedom: 3 },
    "Нет свободы": { money_freedom: 2 },
    "Отсутствие признания": { growth: 1, misfit: 1 },
    "Высокая ответственность": { burnout: 2, stress: 1 },
    "Непонятное будущее": { future_anxiety: 2, unclear: 1 },
  },
  pain: {
    "Мне давно скучно": { boredom: 3 },
    "Я давно не расту": { growth: 3 },
    "Я давно устаю сильнее, чем восстанавливаюсь": { burnout: 3 },
    "Я давно хочу больше денег": { money_freedom: 3 },
    "Я давно думаю, что я не там": { misfit: 3 },
    "Я давно хочу свободы": { money_freedom: 2 },
    "Я давно не понимаю, чего хочу": { unclear: 3 },
  },
  future: {
    Спокойствие: { low_risk: 2, soft_transition: 1 },
    Энергия: { burnout_recovery: 2, low_risk: 1 },
    Деньги: { money_freedom: 2 },
    Свобода: { money_freedom: 2, autonomy_need: 1 },
    Интерес: { boredom: 2, exploration: 1 },
    Уверенность: { growth: 1, self_efficacy: 1 },
    Развитие: { growth: 2 },
    Творчество: { boredom: 1, exploration: 2 },
    Стабильность: { low_risk: 2 },
    Смысл: { misfit: 2 },
    "Время на себя": { low_risk: 1, balance_need: 2 },
    "Ощущение “я на своём месте”": { misfit: 2, unclear: 1 },
  },
  rhythm: {
    Спокойный: { low_risk: 2 },
    Динамичный: { growth: 1 },
    Проектный: { exploration: 1 },
    Гибкий: { money_freedom: 1, autonomy_need: 1 },
  },
  format: {
    Удалённо: { remote_need: 2, autonomy_need: 1 },
    Гибрид: { balance_need: 1 },
    Офис: { environment_fit: 1 },
  },
  tasks: {
    Анализировать: { growth: 1 },
    Создавать: { exploration: 1, boredom: 1 },
    Общаться: { environment_fit: 1 },
    Управлять: { growth: 1 },
    Помогать: { misfit: 1 },
    "Наводить порядок": { low_risk: 1 },
    Придумывать: { exploration: 1, boredom: 1 },
  },
  mainValue: {
    Доход: { money_freedom: 2 },
    Свобода: { money_freedom: 2, autonomy_need: 1 },
    Стабильность: { low_risk: 2 },
    Смысл: { misfit: 2 },
    Рост: { growth: 2 },
    Творчество: { exploration: 2, boredom: 1 },
  },
  anti: {
    "Много созвонов": { environment_mismatch: 1 },
    "Срочность и горящие дедлайны": { burnout: 1, stress: 1 },
    "Чёткий график": { autonomy_need: 1 },
    "Однообразные задачи": { boredom: 1 },
    "Отсутствие понятного роста": { growth: 2 },
    "Зависимость от начальника": { autonomy_need: 2 },
    "Низкий доход": { money_freedom: 2 },
    "Много общения": { environment_mismatch: 1 },
    "Работа без смысла": { misfit: 2 },
    Нестабильность: { low_risk: 2 },
  },
  change: {
    "Маленький шаг": { low_risk: 2, exploration: 1 },
    Марафон: { growth: 1, stable_change: 2 },
    "Полёт на Луну": { misfit: 2, identity_shift: 2, high_intent: 2 },
    Пауза: { burnout: 2, unclear: 2, overload: 1, low_risk: 1 },
  },
  backpack: {
    "Рост дохода": { money_freedom: 2 },
    "Свободу и гибкость": { money_freedom: 2, remote_need: 1 },
    "Ощущение развития": { growth: 2 },
    "Уверенность в себе": { growth: 1, self_efficacy: 2 },
    "Интерес к тому, что делаю": { boredom: 2, exploration: 1 },
    Стабильность: { low_risk: 2, burnout: 1 },
    "Баланс жизни и работы": { burnout: 1, balance_need: 2 },
    "Больше времени на себя и близких": { low_risk: 1, autonomy_need: 2 },
    "Понимание, куда двигаться дальше": { unclear: 2, misfit: 1 },
    "Энергию и мотивацию": { burnout_recovery: 2 },
    "Ощущение новых возможностей": { exploration: 2 },
    "Комфортную рабочую среду": { environment_fit: 2 },
  },
};

const vectorLabels = {
  burnout: "энергия",
  growth: "развитие",
  money_freedom: "свобода и деньги",
  misfit: "ощущение “моё / не моё”",
  boredom: "интерес",
  unclear: "ясность",
  work_link: "влияние работы на состояние",
  stress: "напряжение",
  future_anxiety: "ощущение будущего",
  environment_mismatch: "рабочая среда",
  autonomy_need: "автономия",
  balance_need: "баланс",
  remote_need: "гибкий формат",
};

const outcomeConfig = {
  emotional_exhaustion: {
    title: "Вы в точке истощения: сейчас важен мягкий сценарий изменений",
    badge: "Эмоциональное истощение",
    reframe:
      "Дело не в том, что вы ленитесь или плохо справляетесь. Скорее, вы слишком долго живёте в режиме, который забирает больше энергии, чем возвращает.",
    important: [
      "Не делать резких движений из паники.",
      "Снизить ощущение хаоса.",
      "Вернуть контроль.",
      "Выбирать направления с понятным входом и спокойным темпом освоения.",
    ],
    criteria: [
      "Понятная структура задач",
      "Постепенный вход",
      "Меньше хаоса",
      "Меньше постоянного эмоционального напряжения",
      "Гибкий / удалённый формат",
    ],
    transition: "Дальше покажем направления для мягкого перехода — без идеи всё бросить завтра.",
    cta: "Получить консультацию",
    secondary: "Получить консультацию",
    lever: "спокойствие и восстановление энергии",
  },
  growth_ceiling: {
    title: "Вы упёрлись в потолок: вам нужен следующий уровень, а не полный разворот",
    badge: "Потолок роста",
    reframe:
      "Текущая точка могла стать слишком тесной. Вам может быть скучно не потому, что “всё не то”, а потому что вы переросли прежний уровень задач.",
    important: [
      "Найти зону роста.",
      "Усилить рыночные навыки.",
      "Повысить доход / влияние.",
      "Выбрать направление, которое продолжает опыт, а не обнуляет его.",
    ],
    criteria: [
      "Можно использовать текущий опыт",
      "Есть карьерный и доходный рост",
      "Задачи становятся сложнее и интереснее",
      "Есть понятная траектория развития",
    ],
    transition: "Дальше покажем направления, в которые можно вырасти из вашей текущей точки.",
    cta: "Получить консультацию",
    secondary: "Получить консультацию",
    lever: "рост и новый уровень задач",
  },
  wrong_place: {
    title: "Похоже, вы не на своём месте: стоит искать не просто работу, а подходящую среду",
    badge: "Не своё место",
    reframe:
      "Возможно, проблема не в вашей мотивации. Иногда человек теряет энергию, когда долго находится в задачах и среде, которые ему не подходят.",
    important: [
      "Не выбирать профессию только по зарплате.",
      "Понять подходящий тип задач.",
      "Примерить разные роли до решения.",
      "Собрать критерии “моего” направления.",
    ],
    criteria: [
      "Задачи вызывают интерес",
      "Формат совпадает с вашим темпераментом",
      "Есть ощущение смысла",
      "Можно попробовать профессию до полноценного обучения",
    ],
    transition: "Дальше покажем направления для примерки — чтобы не выбирать вслепую.",
    cta: "Получить консультацию",
    secondary: "Получить консультацию",
    lever: "подходящая среда и ясность",
  },
  money_freedom: {
    title: "Ваш главный запрос — больше свободы и контроля над жизнью",
    badge: "Деньги и свобода",
    reframe:
      "Вам важны не только деньги. За ними стоит более глубокая потребность — самому управлять своим временем, местом работы и будущим.",
    important: [
      "Выбирать навыки с понятной рыночной ценностью.",
      "Смотреть на digital-направления.",
      "Учитывать формат работы, а не только название профессии.",
      "Оценивать скорость монетизации.",
    ],
    criteria: [
      "Потенциал роста дохода",
      "Удалённый или гибкий формат",
      "Навык применим в разных сферах",
      "Понятная траектория от обучения к практике",
    ],
    transition: "Дальше покажем направления с потенциалом дохода, гибкости и удалённого формата.",
    cta: "Получить консультацию",
    secondary: "Получить консультацию",
    lever: "свобода и контроль",
  },
  soft_search: {
    title: "Вам не обязательно всё менять — похоже, вам нужно вернуть интерес и движение",
    badge: "Мягкий поиск нового",
    reframe:
      "Ваше состояние не похоже на кризис. Скорее, жизнь стала слишком предсказуемой, и вам не хватает нового опыта, развития или творческого выхода.",
    important: [
      "Не драматизировать.",
      "Попробовать новое без давления.",
      "Найти навык, который даст энергию.",
      "Оставить возможность: хобби → подработка → новая траектория.",
    ],
    criteria: [
      "Лёгкий вход",
      "Быстрый первый результат",
      "Много творчества или новизны",
      "Не нужно сразу принимать большое карьерное решение",
    ],
    transition: "Дальше покажем направления для мягкого входа в новое — без обязательства менять жизнь.",
    cta: "Получить консультацию",
    secondary: "Получить консультацию",
    lever: "интерес и мягкое движение",
  },
};

const archetypes = {
  emotional_exhaustion: {
    emoji: "🌫",
    name: "Уставший навигатор",
    title: "Вы — Уставший навигатор",
    coreNeed: "мягкая перенастройка маршрута",
    subtitle: "Вы много держали на себе, но сейчас системе нужен не рывок, а мягкая перенастройка маршрута.",
    drains: ["перегруз", "хаос", "постоянное напряжение", "ощущение, что ресурс не успевает восстановиться"],
    restore: ["спокойствие", "контроль", "энергию", "понятный следующий шаг"],
    changeType: "Мягкий переход без резких решений",
    tone: "mist",
  },
  growth_ceiling: {
    emoji: "🧗",
    name: "Человек нового уровня",
    title: "Вы — Человек нового уровня",
    coreNeed: "следующий уровень задач, навыков и влияния",
    subtitle: "Похоже, вы переросли текущую точку. Вам нужен не полный разворот, а следующий уровень задач, навыков и влияния.",
    drains: ["ощущение потолка", "отсутствие роста", "повторяющиеся задачи", "чувство, что вы можете больше"],
    restore: ["развитие", "уверенность", "сложные задачи", "рост дохода / роли"],
    changeType: "Постепенный апгрейд через новые навыки",
    tone: "climb",
  },
  wrong_place: {
    emoji: "🧭",
    name: "Искатель своего маршрута",
    title: "Вы — Искатель своего маршрута",
    coreNeed: "подходящая среда и ощущение “моё”",
    subtitle: "Похоже, дело не только в усталости. Возможно, текущая среда или тип задач просто плохо совпадают с вами.",
    drains: ["ощущение “не моё”", "бессмысленность", "внутренняя сопротивляемость", "неопределённость, куда двигаться"],
    restore: ["интерес", "смысл", "ощущение “я на своём месте”", "ясность выбора"],
    changeType: "Примерка разных направлений перед решением",
    tone: "route",
  },
  money_freedom: {
    emoji: "🌍",
    name: "Архитектор свободы",
    title: "Вы — Архитектор свободы",
    coreNeed: "больше контроля над временем, доходом и образом жизни",
    subtitle: "Ваш главный запрос — больше контроля над временем, доходом и образом жизни.",
    drains: ["финансовые ограничения", "зависимость от графика / места / начальника", "ощущение, что свободы мало", "отсутствие понятной траектории роста"],
    restore: ["гибкость", "доход", "мобильность", "самостоятельность"],
    changeType: "Навыки с понятной рыночной ценностью",
    tone: "world",
  },
  soft_search: {
    emoji: "🌱",
    name: "Исследователь новой главы",
    title: "Вы — Исследователь новой главы",
    coreNeed: "новизна, интерес и мягкое движение вперёд",
    subtitle: "Ваше состояние не похоже на кризис. Скорее, вам не хватает новизны, интереса и ощущения движения.",
    drains: ["рутина", "предсказуемость", "нехватка вдохновения", "ощущение “всё нормально, но пустовато”"],
    restore: ["интерес", "творчество", "новые возможности", "лёгкое движение вперёд"],
    changeType: "Мягкое исследование нового без обязательства всё менять",
    tone: "sprout",
  },
};

const directionRecommendations = {
  emotional_exhaustion: [
    {
      title: "Спокойные digital-направления",
      fit: "Для тех, кому важно меньше хаоса и больше предсказуемости.",
      reason: "Можно входить постепенно, работать с понятными задачами и не ломать жизнь резко.",
      scenario: "Больше контроля, меньше эмоционального перегруза.",
    },
    {
      title: "Дизайн и визуальная коммуникация",
      fit: "Если хочется больше творчества, но без постоянной гонки.",
      reason: "Можно развивать портфолио постепенно и пробовать проектный формат.",
      scenario: "Мягкий переход в новую сферу через практику.",
    },
    {
      title: "Аналитика / системные профессии",
      fit: "Если вам важны структура, логика и понятные процессы.",
      reason: "Подходит тем, кто хочет меньше хаоса и больше ясности в задачах.",
      scenario: "Спокойное развитие через сильный прикладной навык.",
    },
  ],
  growth_ceiling: [
    {
      title: "Product / Project / Management",
      fit: "Для тех, кто хочет больше влияния и сложных задач.",
      reason: "Можно использовать текущий опыт и вырасти в роль с большим уровнем ответственности.",
      scenario: "Апгрейд карьеры без полного обнуления.",
    },
    {
      title: "AI и автоматизация",
      fit: "Если хочется расти быстрее рынка.",
      reason: "Даёт современный навык, который усиливает почти любую профессию.",
      scenario: "Стать более ценным специалистом в своей или смежной сфере.",
    },
    {
      title: "Аналитика и данные",
      fit: "Для тех, кому важны рост, логика и измеримый результат.",
      reason: "Навык применим в разных индустриях и даёт понятную карьерную траекторию.",
      scenario: "Рост через экспертизу и более сложные задачи.",
    },
  ],
  wrong_place: [
    {
      title: "Профессии для примерки",
      fit: "Если пока не хочется выбирать вслепую.",
      reason: "Можно попробовать разные роли и понять, какие задачи реально откликаются.",
      scenario: "Сначала примерка, потом решение.",
    },
    {
      title: "Дизайн / креативные направления",
      fit: "Если хочется больше интереса, смысла и видимого результата.",
      reason: "Подходит тем, кому важно создавать, видеть результат и работать с идеями.",
      scenario: "Новая среда с большим ощущением “моё”.",
    },
    {
      title: "Психология / помогающие направления",
      fit: "Если для вас важны смысл, люди и глубина.",
      reason: "Может подойти, если хочется более человечной и осмысленной деятельности.",
      scenario: "Работа, где важны эмпатия, понимание и поддержка.",
    },
  ],
  money_freedom: [
    {
      title: "Digital-маркетинг",
      fit: "Для тех, кто хочет гибкости, проектов и понятной монетизации.",
      reason: "Навык востребован в бизнесе, фрилансе и удалённом формате.",
      scenario: "Больше свободы через прикладной digital-навык.",
    },
    {
      title: "Аналитика и данные",
      fit: "Если хочется роста дохода через сильную экспертизу.",
      reason: "Навык применим в разных компаниях и может давать карьерную мобильность.",
      scenario: "Увеличить ценность на рынке труда.",
    },
    {
      title: "Разработка / no-code / автоматизация",
      fit: "Если хочется больше независимости и понятной рыночной ценности.",
      reason: "Технические навыки дают больше вариантов занятости и роста.",
      scenario: "Гибкая траектория: работа, проекты, фриланс.",
    },
  ],
  soft_search: [
    {
      title: "Творческие digital-направления",
      fit: "Если хочется добавить больше интереса и новизны.",
      reason: "Можно начать мягко, через небольшие проекты и практику.",
      scenario: "Хобби может стать навыком, подработкой или новой траекторией.",
    },
    {
      title: "Дизайн / визуальный контент",
      fit: "Если хочется быстро видеть результат своих действий.",
      reason: "Хорошо подходит для мягкого входа в новое без резкой смены жизни.",
      scenario: "Больше творчества и ощущения движения.",
    },
    {
      title: "Маркетинг / контент / SMM",
      fit: "Если хочется динамики, идей и понятного применения навыков.",
      reason: "Можно пробовать на небольших проектах и быстро получать обратную связь.",
      scenario: "Новый интерес, который можно постепенно монетизировать.",
    },
  ],
};

const offers = {
  emotional_exhaustion: {
    title: "Мягкий старт без перегруза",
    description: "Скидка на обучение, консультация и спокойный план входа в новое направление.",
    accent: "скидка + консультация + спокойный план входа",
    primaryCta: "Получить консультацию",
  },
  growth_ceiling: {
    title: "Пакет для карьерного апгрейда",
    description: "Скидка на обучение и подбор направления, которое поможет вырасти из текущей точки.",
    accent: "скидка + подбор направления для роста",
    primaryCta: "Получить консультацию",
  },
  wrong_place: {
    title: "Пакет для безопасной примерки",
    description: "Скидка, примерка профессии и консультация, чтобы не выбирать направление вслепую.",
    accent: "скидка + примерка профессии + консультация",
    primaryCta: "Получить консультацию",
  },
  money_freedom: {
    title: "Пакет для роста дохода и гибкости",
    description: "Скидка и подбор направлений с потенциалом монетизации и гибкого формата.",
    accent: "скидка + подбор направлений с потенциалом монетизации",
    primaryCta: "Получить консультацию",
  },
  soft_search: {
    title: "Пакет для мягкого старта в новом",
    description: "Скидка, лёгкий вход и примерка направления без обязательства всё менять.",
    accent: "скидка + лёгкий вход + примерка направления",
    primaryCta: "Получить консультацию",
  },
};

const finalCtas = {
  emotional_exhaustion: {
    primary: "Получить консультацию",
    secondary: "Получить консультацию",
  },
  growth_ceiling: {
    primary: "Получить консультацию",
    secondary: "Получить консультацию",
  },
  wrong_place: {
    primary: "Получить консультацию",
    secondary: "Получить консультацию",
  },
  money_freedom: {
    primary: "Получить консультацию",
    secondary: "Получить консультацию",
  },
  soft_search: {
    primary: "Получить консультацию",
    secondary: "Получить консультацию",
  },
};

const bonusContentByOutcome = {
  emotional_exhaustion: {
    tone: "soft",
    title: "Решиться на изменения бывает особенно сложно, когда сил мало",
    subtitle: "Иногда между человеком и новым этапом стоит не отсутствие возможностей, а усталость и страх снова перегрузить себя.",
    instruction: "Стукните по стеклу, чтобы разбить сомнения",
    consultationCta: "Получить консультацию",
    consultationText: "На консультации поможем:",
    consultationBullets: ["понять, какие направления не усилят перегруз", "выбрать спокойный формат изменений", "определить безопасный первый шаг"],
  },
  growth_ceiling: {
    tone: "active",
    title: "Кажется, вы готовы к следующему уровню",
    subtitle: "Иногда следующий уровень начинается с разрешения себе расти дальше.",
    instruction: "Стукните по стеклу, чтобы открыть следующий шаг",
    consultationCta: "Получить консультацию",
    consultationText: "На консультации поможем:",
    consultationBullets: ["понять, куда можно вырасти из текущего опыта", "выбрать навыки с высоким потенциалом", "собрать план карьерного роста"],
  },
  wrong_place: {
    tone: "exploratory",
    title: "Когда долго ищешь своё, легко застрять в сомнениях",
    subtitle: "Иногда новый этап начинается с разрешения себе попробовать другой путь.",
    instruction: "Стукните по стеклу, чтобы открыть новые возможности",
    consultationCta: "Получить консультацию",
    consultationText: "На консультации поможем:",
    consultationBullets: ["сузить выбор направлений", "понять, что вам действительно подходит", "не выбирать профессию вслепую"],
  },
  money_freedom: {
    tone: "bold",
    title: "Свобода редко появляется сама",
    subtitle: "Но иногда всё начинается с одного действия, которое долго откладывалось.",
    instruction: "Стукните по стеклу, чтобы открыть возможность",
    consultationCta: "Получить консультацию",
    consultationText: "На консультации поможем:",
    consultationBullets: ["выбрать направления с потенциалом дохода", "понять, как перейти без резкого риска", "собрать реалистичный сценарий изменений"],
  },
  soft_search: {
    tone: "playful",
    title: "Иногда новое начинается с маленького внутреннего “а почему бы и нет?”",
    subtitle: "Необязательно менять всю жизнь сразу. Иногда достаточно разрешить себе попробовать.",
    instruction: "Стукните по стеклу, чтобы открыть новый этап",
    consultationCta: "Получить консультацию",
    consultationText: "На консультации поможем:",
    consultationBullets: ["найти направление для мягкого старта", "понять, что стоит попробовать", "превратить интерес в первый навык"],
  },
};

const screensConfig = [
  {
    id: "welcome",
    type: "welcome",
    title: "Временное утомление или постоянный стресс? Поможем разобраться",
    subtitle:
      "Пройдите быстрый диагностический опрос и получите понятный разбор вашего состояния и рекомендации",
    cta: "Начать диагностику",
    meta: "5 минут · результат сразу",
  },
  {
    id: "name",
    type: "input",
    progressLabel: "Шаг 1 из 24",
    title: "Давайте настроим вашу диагностику. Как к вам можно обращаться?",
    placeholder: "Ваше имя",
    answerKey: "user_name",
  },
  {
    id: "generation",
    type: "cards",
    progressLabel: "Шаг 2 из 24",
    title: "К какому поколению вы себя скорее относите?",
    subtitle: "Это поможет точнее настроить диагностику.",
    answerKey: "generation",
    options: generationCards,
    autoAdvance: true,
  },
  {
    id: "emotional",
    type: "chips",
    progressLabel: "Шаг 3 из 24",
    title: "Опишите своё внутреннее состояние",
    subtitle: "Можно выбрать несколько вариантов.",
    answerKey: "emotional_tags",
    options: emotionalOptions,
  },
  {
    id: "physical",
    type: "rows",
    progressLabel: "Шаг 4 из 24",
    title: "А как это ощущается физически?",
    subtitle: "Выберите всё, что похоже на ваше состояние.",
    answerKey: "physical_tags",
    options: physicalOptions,
  },
  {
    id: "color",
    type: "color",
    progressLabel: "Шаг 5 из 24",
    title: "Выберите цвет, который сейчас кажется вам ближе",
    subtitle:
      "Не анализируйте слишком долго — выбирайте интуитивно. После выбора цвет исчезнет.",
    instruction: "Нажимайте на цвета в том порядке, в котором они вам сейчас откликаются.",
    answerKey: "color_order",
    options: colorOptions,
  },
  {
    id: "profile_analysis",
    type: "analysis",
    progressLabel: "Шаг 6 из 24",
    loaderId: "initial_profile",
    title: "Профиль начинает собираться",
    duration: 3600,
    lines: [
      "эмоциональный фон",
      "телесные сигналы",
      "скрытые эмоциональные паттерны",
      "определяем основные источники потери энергии",
    ],
    nextTitle: "Дальше уточним:",
    nextLines: [
      "где вы теряете и возвращаете ресурс",
      "что сильнее всего забирает энергию",
      "чего вам хочется вернуть в жизнь и работу",
      "какой формат изменений сейчас безопасен",
      "какой сценарий и направления могут вам подойти",
    ],
  },
  {
    id: "contexts",
    type: "contexts",
    progressLabel: "Шаг 7 из 24",
    title: "Где вы оживаете, а где проседаете?",
    subtitle: "Перетащите карточки в колонку или нажимайте на них, чтобы менять состояние.",
  },
  {
    id: "day_line",
    type: "dayLine",
    progressLabel: "Шаг 8 из 24",
    title: "Нарисуйте линию своего дня",
    subtitle: "Выше — легче и больше энергии. Ниже — тяжелее и меньше энергии.",
  },
  {
    id: "battery",
    type: "battery",
    progressLabel: "Шаг 9 из 24",
    title: "Что сильнее всего забирает батарейку?",
    subtitle: "Выберите до 4 карточек.",
  },
  {
    id: "long_pain",
    type: "longPress",
    progressLabel: "Шаг 10 из 24",
    title: "Что вы терпите дольше всего?",
    subtitle: "Зажмите карточку, которая болит давно.",
  },
  {
    id: "tension_map_analysis",
    type: "analysis",
    loaderId: "tension_map",
    title: "Собираем карту напряжения",
    duration: 2800,
    lines: [
      "сравниваем, где вам легче и тяжелее",
      "анализируем дневную кривую состояния",
      "определяем главные источники потери энергии",
      "ищем устойчивый паттерн",
    ],
  },
  {
    id: "source_insight",
    type: "sourceInsight",
    progressLabel: "Шаг 11 из 24",
    title: "Мы нашли основной источник напряжения",
  },
  {
    id: "future",
    type: "future",
    progressLabel: "Шаг 12 из 24",
    title: "Если через год станет лучше — чего станет больше?",
    subtitle: "Выберите 3 карточки и отправьте их в светлое будущее.",
  },
  {
    id: "normal_work",
    type: "workBuilder",
    progressLabel: "Шаг 13 из 24",
    title: "Соберите свою нормальную работу",
    subtitle:
      "Работа занимает большую часть бодрствующего времени. Поэтому важно понять не только “кем быть”, но и в каком ритме, среде и задачах вам будет нормально.",
  },
  {
    id: "anti",
    type: "antiSwipe",
    progressLabel: "Шаг 14 из 24",
    title: "Что точно не хочется тащить в следующий этап?",
  },
  {
    id: "change_map_analysis",
    type: "analysis",
    loaderId: "change_map",
    title: "Настраиваем вашу карту изменений",
    duration: 2800,
    lines: [
      "фиксируем, чего вам хочется вернуть",
      "собираем образ нормальной работы",
      "учитываем, что точно не хочется тащить дальше",
      "определяем безопасный формат следующего шага",
    ],
  },
  {
    id: "criteria_preview",
    type: "criteriaPreview",
    progressLabel: "Шаг 15 из 24",
    title: "Что уже видно по вашему профилю",
  },
  {
    id: "change_mode",
    type: "changeMode",
    progressLabel: "Шаг 16 из 24",
    title: "Какой способ изменений сейчас кажется возможным?",
  },
  {
    id: "backpack",
    type: "backpack",
    progressLabel: "Шаг 17 из 24",
    title: "Что вы бы хотели взять с собой в следующую главу жизни?",
    subtitle: "Выберите 5 вещей для своего рюкзака.",
  },
  {
    id: "final_result_analysis",
    type: "analysis",
    loaderId: "final_result",
    title: "Готовим ваш персональный результат",
    duration: 3200,
    lines: [
      "определяем архетип изменений",
      "собираем карту перехода",
      "подбираем профессиональные среды",
      "готовим персональный бонус",
      "финализируем результат",
    ],
  },
  {
    id: "contact",
    type: "contact",
    progressLabel: "Шаг 19 из 24",
    title: "Ваш результат готов",
  },
  {
    id: "outcome",
    type: "outcome",
    progressLabel: "Шаг 20 из 24",
    title: "Ваш архетип изменений",
  },
  {
    id: "transition_map",
    type: "transitionMap",
    progressLabel: "Шаг 21 из 24",
    title: "Ваша карта перехода",
  },
  {
    id: "directions",
    type: "directions",
    progressLabel: "Шаг 22 из 24",
    title: "Подходящие профессиональные среды",
  },
  {
    id: "bonus",
    type: "bonus",
    progressLabel: "Шаг 23 из 24",
    title: "Персональный стартовый бонус",
  },
  {
    id: "next_step",
    type: "nextStep",
    progressLabel: "Шаг 24 из 24",
    title: "Следующий шаг",
  },
];

const questionsConfig = {
  generation: generationCards,
  emotional: emotionalOptions,
  physical: physicalOptions,
  color: colorOptions,
  contexts: contextCards,
  battery: batteryCards,
  future: futureDesireCards,
  anti: antiCards,
  backpack: backpackItems,
};

const app = document.querySelector("#app");
const state = hydrateState();
let analysisTimer = null;
let longPressTimer = null;
let longPressAdvanceTimer = null;
let bonusHintTimer = null;
let bonusRevealTimer = null;
let bonusCaughtTimer = null;
let bonusCountdownTimer = null;
let dayDrawing = false;
let dayCanvasCtx = null;
let contextDrag = null;

window.addEventListener("resize", () => {
  state.viewport = getViewport();
  persistState();
  window.requestAnimationFrame(fitCurrentScreen);
  if (getCurrentScreen().type === "dayLine") window.requestAnimationFrame(drawDayLine);
});

window.addEventListener("beforeunload", () => {
  syncDerived();
  const screen = getCurrentScreen();
  navigator.sendBeacon?.(SAVE_ENDPOINT, JSON.stringify(createSavePayload(screen.id, getAnswerByScreen(screen))));
});

render();
flushSaveQueue();

function hydrateState() {
  const previous = readJson(STORAGE_KEY) || readJson("skillbox_diagnostic_state_v1");
  const base = {
    session_id: createSessionId(),
    started_at: new Date().toISOString(),
    last_step: "welcome",
    completed: false,
    user_name: "",
    generation: "",
    emotional_tags: [],
    physical_tags: [],
    color_order: [],
    color_first_choices: [],
    color_last_choices: [],
    color_interpretation: { primary_need: "", resistance_zone: "", insight_modifier: "" },
    context_map: {},
    day_line_points: [],
    battery_drainers: [],
    long_term_pain: "",
    future_desires: [],
    normal_work: emptyProfile().normalWork,
    anti_decisions: {},
    change_mode: "",
    next_chapter_items: [],
    lead: { email: "", phone: "" },
    bonus_game_state: "intro",
    bonus_hint_level: 0,
    bonus_cracks: 0,
    promo_copied: false,
    reward: null,
    primary_pattern: "",
    physical_pattern: "",
    answers_by_step: {},
    profile: emptyProfile(),
    score: emptyScore(),
    outcome: "",
    utm: readUtm(),
    referrer: document.referrer || "",
    landing_url: window.location.href,
    timestamp: new Date().toISOString(),
    device_type: getDeviceType(),
    viewport: getViewport(),
  };

  const merged = previous ? { ...base, ...previous } : base;
  merged.profile = mergeProfile(base.profile, previous?.profile || {});
  merged.score = { ...emptyScore(), ...(previous?.score || {}) };
  merged.normal_work = { ...emptyProfile().normalWork, ...(previous?.normal_work || merged.profile.normalWork || {}) };
  if (merged.last_step === "loader" || merged.last_step === "insight") merged.last_step = "profile_analysis";
  syncDerived(merged);
  return merged;
}

function mergeProfile(base, incoming) {
  return {
    ...base,
    ...incoming,
    normalWork: {
      ...base.normalWork,
      ...(incoming.normalWork || {}),
    },
  };
}

function readUtm() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
  };
}

function getDeviceType() {
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1100) return "tablet";
  return "desktop";
}

function getViewport() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    dpr: window.devicePixelRatio || 1,
  };
}

function getCurrentScreen() {
  return screensConfig.find((screen) => screen.id === state.last_step) || screensConfig[0];
}

function getScreenIndex(id = state.last_step) {
  return screensConfig.findIndex((screen) => screen.id === id);
}

function render(direction = "forward") {
  clearTimers();
  syncDerived();
  const screen = getCurrentScreen();
  const progress = getProgress(screen);
  const progressLabel = getProgressLabel(screen);

  app.innerHTML = `
    <section class="screen screen--${screen.type} screen-id--${screen.id} ${direction === "back" ? "is-back" : ""} ${direction === "stay" ? "is-stay" : ""}">
      ${screen.type === "welcome" ? renderWelcome(screen) : renderFlowShell(screen, progress, progressLabel)}
    </section>
  `;

  bindScreen(screen);
  window.requestAnimationFrame(fitCurrentScreen);
}

function renderWelcome(screen) {
  return `
    <img class="welcome-brand" src="${SKILLBOX_LOGO_URL}" alt="Skillbox" />
    <div class="welcome-shell">
      <div class="welcome-visual-wrap">
        <img class="welcome-visual" src="${WELCOME_VISUAL_URL}" alt="" aria-hidden="true" />
      </div>
      <div class="welcome-content">
        <h1>${screen.title}</h1>
        <p class="lead">${screen.subtitle}</p>
        <div class="welcome-bottom">
          <button class="primary-button" data-action="next">${screen.cta}</button>
          <p class="microcopy">
            <span class="trust-item">
              <svg class="trust-icon" viewBox="0 0 16 16" aria-hidden="true">
                <circle cx="8" cy="8" r="5.75" fill="none" stroke="currentColor" stroke-width="1.5"></circle>
                <path d="M8 4.7v3.6l2.4 1.4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              5 минут
            </span>
            <span class="trust-item">
              <svg class="trust-icon" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8.9 1.8 3.7 8.6h3.8l-.5 5.6 5.3-7H8.4l.5-5.4Z" fill="currentColor"></path>
              </svg>
              результат сразу
            </span>
          </p>
        </div>
      </div>
    </div>
  `;
}

function renderFlowShell(screen, progress, progressLabel) {
  return `
    <header class="topbar">
      <div class="progress-wrap" aria-label="${progressLabel}">
        <div class="progress-line"><span style="width:${progress}%"></span></div>
        <p>${progressLabel}</p>
      </div>
    </header>
    <div class="content">${renderScreenBody(screen)}</div>
    ${renderBottomCta(screen)}
  `;
}

function renderScreenBody(screen) {
  const renderers = {
    input: renderInput,
    cards: renderCards,
    chips: renderChips,
    rows: renderRows,
    color: renderColorChoice,
    analysis: renderAnalysis,
    contexts: renderContexts,
    dayLine: renderDayLine,
    battery: renderBattery,
    longPress: renderLongPress,
    sourceInsight: renderSourceInsight,
    future: renderFuture,
    workBuilder: renderWorkBuilder,
    antiSwipe: renderAntiSwipe,
    criteriaPreview: renderCriteriaPreview,
    changeMode: renderChangeMode,
    backpack: renderBackpack,
    trajectory: renderTrajectory,
    contact: renderContact,
    outcome: renderOutcome,
    transitionMap: renderTransitionMap,
    directions: renderDirections,
    bonus: renderBonus,
    nextStep: renderNextStep,
  };
  return renderers[screen.type]?.(screen) || "";
}

function renderHeaderText(screen) {
  return `
    <div class="copy-block">
      <h1>${screen.title}</h1>
      ${screen.subtitle ? `<p>${screen.subtitle}</p>` : ""}
    </div>
  `;
}

function renderInput(screen) {
  const value = state[screen.answerKey] || "";
  return `
    ${renderHeaderText(screen)}
    <label class="name-field">
      <span>${screen.placeholder}</span>
      <input data-field="${screen.answerKey}" type="text" inputmode="text" autocomplete="given-name" placeholder="${screen.placeholder}" value="${escapeHtml(value)}" autofocus />
    </label>
  `;
}

function renderCards(screen) {
  const selected = state[screen.answerKey];
  return `
    ${renderHeaderText(screen)}
    <div class="generation-grid">
      ${screen.options
        .map(
          (option) => `
          <button class="generation-card ${selected === option.id ? "is-selected" : ""}" data-select-single="${screen.answerKey}" data-value="${option.id}">
            <span class="generation-image generation-image--${option.tone}" aria-hidden="true">${renderGenerationPeople(option)}</span>
            <span class="generation-title">${option.title}</span>
            <span class="generation-years">${option.years}</span>
          </button>
        `,
        )
        .join("")}
    </div>
  `;
}

function renderGenerationPeople(option) {
  return `
    <span class="person person--female person--${option.id}"><span class="hair"></span><span class="head"></span><span class="body"></span></span>
    <span class="person person--male person--${option.id}"><span class="hair"></span><span class="head"></span><span class="body"></span></span>
    <span class="generation-spark generation-spark--one"></span>
    <span class="generation-spark generation-spark--two"></span>
  `;
}

function renderChips(screen) {
  const selected = state[screen.answerKey] || [];
  return `
    ${renderHeaderText(screen)}
    <div class="choice-scroll choice-scroll--chips">
      <div class="chip-cloud">
        ${screen.options
          .map(
            (option) => `
            <button class="chip chip--negative ${selected.includes(option) ? "is-selected" : ""}" data-toggle="${screen.answerKey}" data-value="${escapeHtml(option)}">
              ${option}
            </button>
          `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderRows(screen) {
  const selected = state[screen.answerKey] || [];
  const orderedOptions = [...selected.filter((option) => screen.options.includes(option)), ...screen.options.filter((option) => !selected.includes(option))];
  return `
    ${renderHeaderText(screen)}
    <div class="choice-scroll">
      <div class="row-list">
        ${orderedOptions
          .map(
            (option, index) => `
            <button class="row-choice ${selected.includes(option) ? "is-selected" : ""}" data-toggle="${screen.answerKey}" data-value="${escapeHtml(option)}">
              <span class="row-icon">${getBodyIcon(index)}</span>
              <span>${option}</span>
            </button>
          `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderColorChoice(screen) {
  const selected = state.color_order || [];
  return `
    ${renderHeaderText(screen)}
    <p class="color-instruction">${screen.instruction}</p>
    <div class="color-step-count">Выбрано ${selected.length} из ${screen.options.length}</div>
    <div class="color-grid">
      ${screen.options
        .map(
          (color) => {
            const isPicked = selected.includes(color.id);
            return `
          <button class="color-tile color-tile--${color.id} ${isPicked ? "is-picked" : ""}" data-color-id="${color.id}" style="--tile-color:${color.value}" aria-label="${color.title}" ${isPicked ? "disabled" : ""}>
            <span class="color-tile__label">${color.title}</span>
          </button>
        `;
          },
        )
        .join("")}
    </div>
  `;
}

function renderAnalysis(screen) {
  const lines = screen.lines || [
    "эмоциональный фон",
    "телесные сигналы",
    "скрытые эмоциональные паттерны",
    "определяем основные источники потери энергии",
  ];
  const title = screen.loaderId === "final_result" && state.user_name
    ? `${state.user_name}, мы почти собрали ваш сценарий`
    : screen.title;
  return `
    <div class="analysis-panel">
      <div class="analysis-orbit" aria-hidden="true"><span></span><span></span><span></span></div>
      <h1>${title}</h1>
      <ul class="analysis-list">
        ${lines.map((line, index) => `
          <li style="--delay:${120 + index * 360}ms" class="${index === lines.length - 1 ? "is-loading" : ""}">
            <span>${index === lines.length - 1 ? "◯" : "✓"}</span>${line}
          </li>
        `).join("")}
      </ul>
      ${screen.nextLines ? `
        <div class="analysis-next">
          <h2>${screen.nextTitle || "Следующие шаги диагностики"}</h2>
          <ul>
            ${screen.nextLines.map((line, index) => `<li style="--delay:${1650 + index * 260}ms">${line}</li>`).join("")}
          </ul>
        </div>
      ` : ""}
      <button class="analysis-continue" type="button" data-action="next">Продолжить</button>
    </div>
  `;
}

function renderContexts(screen) {
  const map = state.context_map || {};
  const grouped = {
    positive: contextCards.filter((card) => map[card] === "positive"),
    neutral: contextCards.filter((card) => !map[card] || map[card] === "neutral"),
    negative: contextCards.filter((card) => map[card] === "negative"),
  };
  return `
    ${renderHeaderText(screen)}
    <div class="context-board">
      ${renderDropZone("positive", "Мне становится легче / приятнее", grouped.positive)}
      ${renderDropZone("negative", "Мне становится тяжелее / хуже", grouped.negative)}
    </div>
    <div class="neutral-zone" data-drop-zone="neutral">
      <div class="mini-label">Не влияет или пока не понятно</div>
      <div class="card-pool">${grouped.neutral.map(renderTinyCard).join("")}</div>
    </div>
  `;
}

function renderDropZone(zone, title, cards) {
  return `
    <section class="drop-zone drop-zone--${zone}" data-drop-zone="${zone}">
      <h2>${title}</h2>
      <div class="drop-stack">${cards.length ? cards.map(renderTinyCard).join("") : `<div class="drop-empty">Перетащите сюда</div>`}</div>
    </section>
  `;
}

function renderTinyCard(card) {
  return `<button class="tiny-card" draggable="true" data-context-card="${escapeHtml(card)}">${card}</button>`;
}

function renderDayLine(screen) {
  const pattern = state.profile.dayLinePattern;
  return `
    ${renderHeaderText(screen)}
    <div class="day-line-card">
      <canvas class="day-canvas" width="720" height="420" aria-label="Линия состояния за день"></canvas>
      <div class="day-x"><span>Утро / пробуждение</span><span>Обед</span><span>Сон</span></div>
    </div>
    <div class="micro-insight ${pattern ? "is-visible" : ""}">
      ${pattern ? `<strong>${pattern}</strong><span>${getDayLineInsight(pattern)}</span>` : "Проведите линию пальцем или мышью от утра к ночи."}
    </div>
  `;
}

function renderBattery(screen) {
  const selected = state.battery_drainers || [];
  const charge = Math.max(0, 100 - selected.length * 25);
  return `
    ${renderHeaderText(screen)}
    <div class="battery-stage" data-drop-battery>
      <div class="battery-shell">
        <div class="battery-fill" style="height:${charge}%"></div>
        <span>${charge}%</span>
      </div>
      <div class="battery-selected">${selected.map((item) => `<button type="button" data-battery="${escapeHtml(item)}" aria-label="Убрать ${escapeHtml(item)}">${item}</button>`).join("") || "Перетащите или нажмите до 4 источников"}</div>
    </div>
    <div class="option-grid option-grid--compact">
      ${batteryCards.map((item) => `<button class="option-card ${selected.includes(item) ? "is-selected" : ""}" data-battery="${escapeHtml(item)}">${item}</button>`).join("")}
    </div>
  `;
}

function renderLongPress(screen) {
  return `
    ${renderHeaderText(screen)}
    <div class="long-grid">
      ${longPainCards
        .map(
          (item) => `
          <button class="long-card ${state.long_term_pain === item ? "is-selected" : ""}" data-long-pain="${escapeHtml(item)}">
            <span>${item}</span>
            <i aria-hidden="true"></i>
          </button>
        `,
        )
        .join("")}
    </div>
  `;
}

function renderSourceInsight(screen) {
  const top = getTopVectors(3);
  return `
    <div class="profile-card insight-output">
      <div class="insight-badge">Первый сильный инсайт</div>
      <h1>${screen.title}</h1>
      <div class="insight-panel">
        <p>По вашим ответам видно: дело не только в усталости. Сильнее всего сейчас проседают:</p>
        <ol class="rank-list">${top.map(([key]) => `<li>${vectorLabels[key] || key}</li>`).join("")}</ol>
      </div>
    </div>
  `;
}

function renderFuture(screen) {
  const selected = state.future_desires || [];
  return `
    ${renderHeaderText(screen)}
    <div class="future-target" data-drop-future>
      <div>
        <span class="mini-label">Светлое будущее</span>
        <strong>${selected.length}/3</strong>
      </div>
      <div class="future-slots">${selected.map((item) => `<button type="button" data-future="${escapeHtml(item)}" aria-label="Убрать ${escapeHtml(item)}">${item}</button>`).join("") || "<em>Перетащите сюда 3 желания</em>"}</div>
    </div>
    <div class="option-grid option-grid--compact">
      ${futureDesireCards.map((item) => `<button class="option-card ${selected.includes(item) ? "is-selected" : ""}" data-future="${escapeHtml(item)}">${item}</button>`).join("")}
    </div>
  `;
}

function renderWorkBuilder(screen) {
  const work = state.normal_work || emptyProfile().normalWork;
  return `
    ${renderHeaderText(screen)}
    <div class="work-builder">
      ${renderBuilderGroup("Ритм", "rhythm", workBuilder.rhythm, work.rhythm, false)}
      ${renderBuilderGroup("Формат", "format", workBuilder.format, work.format, false)}
      ${renderBuilderGroup("Задачи", "tasks", workBuilder.tasks, work.tasks || [], true)}
      ${renderBuilderGroup("Главная ценность", "mainValue", workBuilder.mainValue, work.mainValue, false)}
    </div>
  `;
}

function renderBuilderGroup(title, key, items, selected, multiple) {
  return `
    <section class="builder-group">
      <h2>${title}${multiple ? " · до 3" : ""}</h2>
      <div class="builder-options">
        ${items
          .map((item) => {
            const active = multiple ? selected.includes(item) : selected === item;
            return `<button class="builder-pill ${active ? "is-selected" : ""}" data-builder="${key}" data-multiple="${multiple}" data-value="${escapeHtml(item)}">${item}</button>`;
          })
          .join("")}
      </div>
    </section>
  `;
}

function renderAntiSwipe(screen) {
  const decisions = state.anti_decisions || {};
  const index = Math.min(Object.keys(decisions).length, antiCards.length - 1);
  const current = antiCards.find((item) => !decisions[item]);
  const removed = getAntiCriteria();
  if (!current) {
    return `
      ${renderHeaderText(screen)}
      <div class="done-stack">
        <strong>Готово</strong>
        <p>Мы убрали из будущего сценария: ${removed.length ? removed.join(", ") : "ничего критичного"}.</p>
      </div>
    `;
  }
  return `
    ${renderHeaderText(screen)}
    <div class="swipe-stage">
      <div class="swipe-counter">${index + 1}/${antiCards.length}</div>
      <article class="swipe-card" data-swipe-card="${escapeHtml(current)}">${current}</article>
    </div>
    <div class="swipe-actions">
      <button class="secondary-button" data-anti-decision="keep" data-value="${escapeHtml(current)}">Оставить</button>
      <button class="primary-button inline-primary" data-anti-decision="remove" data-value="${escapeHtml(current)}">Убрать</button>
    </div>
  `;
}

function renderCriteriaPreview(screen) {
  const criteria = buildCriteria().criteria.slice(0, 4);
  return `
    <div class="profile-card reveal-card insight-output">
      <div class="insight-badge">Профиль собран</div>
      <h1>${screen.title}</h1>
      <div class="insight-panel">
        <ol class="rank-list">${criteria.map((item) => `<li>${item}</li>`).join("")}</ol>
      </div>
    </div>
  `;
}

function renderChangeMode(screen) {
  return `
    ${renderHeaderText(screen)}
    <div class="mode-grid">
      ${changeModes
        .map(
          (mode) => `
          <button class="mode-card mode-card--${mode.visual} ${state.change_mode === mode.title ? "is-selected" : ""}" data-change-mode="${mode.title}">
            <span class="mode-visual" aria-hidden="true"></span>
            <strong>${mode.title}</strong>
            <span>${mode.text}</span>
          </button>
        `,
        )
        .join("")}
    </div>
  `;
}

function renderBackpack(screen) {
  const selected = state.next_chapter_items || [];
  return `
    ${renderHeaderText(screen)}
    <div class="backpack-stage" data-drop-backpack>
      <div class="backpack-visual" aria-hidden="true"><span>${selected.length}/5</span></div>
      <div class="backpack-items">${selected.map((item) => `<button type="button" data-backpack="${escapeHtml(item)}" aria-label="Убрать ${escapeHtml(item)}">${itemIcons[item] || "•"} ${item}</button>`).join("") || "Перетащите или нажмите 5 вещей"}</div>
    </div>
    <div class="option-grid option-grid--compact">
      ${backpackItems.map((item) => `<button class="option-card ${selected.includes(item) ? "is-selected" : ""}" data-backpack="${escapeHtml(item)}"><span>${itemIcons[item] || "•"}</span>${item}</button>`).join("")}
    </div>
  `;
}

function renderTrajectory(screen) {
  const dominant = getDominantOutcomeVector();
  const before = getBeforeLines(dominant);
  const after = [
    "появляется понятный следующий шаг",
    "критерии выбора становятся яснее",
    "можно двигаться без резких решений",
    "появляется ощущение контроля",
  ];
  const outcome = outcomeConfig[getOutcome(state.score)];
  return `
    <div class="profile-card trajectory-card insight-output">
      <h1>${screen.title}</h1>
      <div class="split-screen">
        <section>
          <span>Если ничего не менять</span>
          ${before.map((line) => `<p>${line}</p>`).join("")}
        </section>
        <section>
          <span>Если начать изменения</span>
          ${after.map((line) => `<p>${line}</p>`).join("")}
        </section>
      </div>
      <div class="bridge">По вашим ответам видно: ключевой рычаг изменений для вас — ${outcome.lever}.</div>
    </div>
  `;
}

function renderContact(screen) {
  return `
    <div class="contact-layout">
      <div class="result-preview" aria-hidden="true">
        <span>архетип изменений</span>
        <span>карта перехода</span>
        <span>профессиональные среды</span>
      </div>
      <div class="profile-card contact-card">
        <h1>${screen.title}</h1>
        <p>Мы собрали: ваш архетип изменений, карту перехода, подходящие профессиональные среды и стартовый бонус.</p>
        <label class="name-field">
          <span>Email</span>
          <input data-lead="email" type="email" inputmode="email" autocomplete="email" placeholder="you@example.com" value="${escapeHtml(state.lead.email)}" />
        </label>
        <label class="name-field">
          <span>Телефон</span>
          <input data-lead="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+7" value="${escapeHtml(state.lead.phone)}" />
        </label>
      </div>
    </div>
  `;
}

function renderOutcome(screen) {
  const result = buildResult();
  const archetype = result.archetype;
  return `
    <div class="archetype-card archetype-card--${archetype.tone}">
      <div class="archetype-symbol" aria-hidden="true">${archetype.emoji}</div>
      <div class="insight-badge">Ваш архетип</div>
      <h1>${archetype.title}</h1>
      <p>${archetype.subtitle}</p>
      <div class="archetype-grid">
        ${renderArchetypeBlock("Что вас сейчас истощает", archetype.drains)}
        ${renderArchetypeBlock("Что важно вернуть", archetype.restore)}
        ${renderArchetypeBlock("Какой тип изменений подходит", [archetype.changeType])}
      </div>
    </div>
  `;
}

function renderArchetypeBlock(title, items) {
  return `
    <section>
      <h2>${title}</h2>
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
  `;
}

function renderTransitionMap(screen) {
  const result = buildResult();
  const map = result.transitionMap;
  const criteria = buildCriteria().criteria.slice(0, 3);
  const steps = [
    ["Сейчас", map.currentState],
    ["Важно вернуть", map.restoreNeeds.join(", ")],
    ["Безопасный формат изменений", map.safeChangeFormat],
    ["Следующий шаг", map.nextStep],
  ];
  return `
    <div class="profile-card transition-map-card insight-output">
      <div class="insight-badge">Карта перехода</div>
      <h1>${screen.title}</h1>
      <div class="insight-panel">
        <p>Мы собрали маршрут из ваших ответов: что происходит сейчас, что важно вернуть и каким способом двигаться дальше.</p>
      </div>
      <div class="transition-path">
        ${steps
          .map(
            ([title, text], index) => `
            <section class="transition-node">
              <span>${index + 1}</span>
              <div>
                <h2>${title}</h2>
                <p>${text}</p>
              </div>
            </section>
          `,
          )
          .join("")}
      </div>
      <div class="criteria-strip">
        ${criteria.map((item) => `<span>${item}</span>`).join("")}
      </div>
    </div>
  `;
}

function renderDirections(screen) {
  const result = buildResult();
  return `
    <div class="directions-layout">
      <div class="copy-block">
        <h1>Мы подобрали профессиональные среды, которые могут вам подойти</h1>
      </div>
      <div class="direction-list">
        ${result.directions
          .map(
            (direction, index) => `
            <article class="direction-card ${index === 0 ? "is-best-match" : ""}">
              ${index === 0 ? `<span class="direction-pill">Лучшее совпадение</span>` : ""}
              <h2>${direction.title}</h2>
              <p>${direction.fit}</p>
              <div class="direction-facts">
                <div class="direction-fact direction-fact--fit"><span aria-hidden="true">✓</span><p>${direction.reason}</p></div>
                <div class="direction-fact direction-fact--growth"><span aria-hidden="true">↗</span><p>${direction.scenario}</p></div>
              </div>
              <button class="direction-cta" type="button">Получить консультацию</button>
            </article>
          `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderBonus(screen) {
  const result = buildResult();
  const content = bonusContentByOutcome[result.outcome];
  const reward = state.reward || {};
  const isRevealed = Boolean(reward.revealedAt && reward.mechanic === "break_glass_of_doubt");
  const storedGameState = ["intro", "glass", "breaking"].includes(state.bonus_game_state) ? state.bonus_game_state : "intro";
  const gameState = isRevealed ? "reveal" : storedGameState;
  const promoCode = reward.promoCode || generatePromoCode(state.profile?.name || state.user_name, new Date());
  const countdown = getRewardCountdown(reward);
  const crackCount = Math.min(GLASS_CRACK_TARGET, state.bonus_cracks || 0);
  const crackProgress = Math.min(100, Math.round((crackCount / GLASS_CRACK_TARGET) * 100));
  const isConsultationRequested = Boolean(reward.consultationRequested);
  const showGlassInteraction = gameState === "intro" || gameState === "glass";
  return `
    <div class="glass-bonus glass-bonus--${content.tone} glass-bonus--${gameState}">
      <div class="glass-particles" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      ${showGlassInteraction ? `
        <div class="glass-interaction">
          <div class="glass-copy">
            <span class="glass-kicker">Стекло сомнений</span>
            <h1>${content.title}</h1>
            <p>${content.subtitle}</p>
          </div>
          <div class="glass-pane" data-glass-pane>
            <div class="glass-glow" aria-hidden="true"></div>
            <div class="glass-bonus-ghost" aria-hidden="true">
              <span>?</span>
              <strong>скрытый бонус</strong>
            </div>
            <div class="glass-pane-callout">
              <strong>${content.instruction}</strong>
              <span>Касайтесь стекла, пока оно не поддастся</span>
            </div>
            <div class="glass-crack-layer" aria-hidden="true">
              ${Array.from({ length: crackCount }, (_, index) => `<span class="glass-crack glass-crack--${index + 1}"></span>`).join("")}
            </div>
          </div>
          <div class="glass-progress"><span style="width:${crackProgress}%"></span></div>
          <button class="glass-skip" type="button" data-bonus-action="reveal">Открыть бонус без игры</button>
        </div>
      ` : ""}
      ${gameState === "breaking" ? `
        <div class="glass-breaking">
          <div class="glass-burst" aria-hidden="true"></div>
          <span class="glass-kicker">Возможность открыта</span>
          <h1>Мы подготовили для вас персональный стартовый бонус.</h1>
          <p>Стекло сомнений рассыпалось. Теперь можно спокойно выбрать следующий шаг.</p>
        </div>
      ` : ""}
      ${gameState === "reveal" ? `
        <div class="glass-reveal">
          <div class="glass-reveal-head">
            <span class="glass-kicker">Возможность открыта</span>
            <strong class="${countdown.isExpired ? "is-expired" : ""}">${countdown.isExpired ? "Срок действия бонуса закончился" : "Бонус доступен 24 часа"}</strong>
          </div>
          <div class="glass-package">
            <div class="glass-gift" aria-hidden="true">🎁</div>
            <div>
              <h1>Ваш персональный стартовый пакет</h1>
              <ul class="glass-bonus-list">
                <li>скидка 60% на подходящие программы Skillbox</li>
                <li>персональная консультация</li>
                <li>помощь с выбором направления</li>
                <li>план первого шага</li>
              </ul>
            </div>
          </div>
          <div class="promo-card">
            <span>Ваш персональный промокод:</span>
            <strong>${promoCode}</strong>
            <button class="secondary-button" type="button" data-bonus-action="copy">${state.promo_copied ? "✓ Промокод скопирован" : "Скопировать"}</button>
          </div>
          <div class="bonus-timer ${countdown.isExpired ? "is-expired" : ""}">
            <span>Бонус действует ещё:</span>
            <strong data-countdown>${countdown.label}</strong>
          </div>
          ${isConsultationRequested ? `
            <section class="consultation-success-card">
              <h2>Супер, мы получили вашу заявку на карьерную консультацию.</h2>
              <p>Скоро вам позвонит наш консультант, а пока посмотрите направления, которые мы подобрали по результатам диагностики.</p>
              <button class="primary-button inline-primary" type="button" data-bonus-action="directions">Посмотреть направления</button>
            </section>
          ` : `
            <button class="primary-button inline-primary consultation-main-cta" type="button" data-bonus-action="consultation" ${countdown.isExpired ? "disabled" : ""}>${content.consultationCta}</button>
            <section class="consultation-support-card">
              <div class="human-avatar" aria-hidden="true">S</div>
              <div>
                <h2>${content.consultationText}</h2>
                <ul>${content.consultationBullets.map((item) => `<li>${item}</li>`).join("")}</ul>
              </div>
            </section>
            <button class="glass-save-button" type="button" data-bonus-action="save">Пока просто сохранить бонус</button>
          `}
        </div>
      ` : ""}
    </div>
  `;
}

function renderNextStep(screen) {
  const result = buildResult();
  return `
    <div class="profile-card next-card insight-output">
      <div class="insight-badge">Финальный шаг</div>
      <h1>${screen.title}</h1>
      <div class="insight-panel">
        <p>Вы уже собрали карту состояния и несколько безопасных вариантов движения. Осталось выбрать, с чего начать.</p>
      </div>
      <div class="next-actions">
        <button class="primary-button inline-primary" type="button">${result.finalCta.primary}</button>
        <button class="secondary-button" type="button">${result.finalCta.secondary}</button>
      </div>
    </div>
  `;
}

function renderBottomCta(screen) {
  if (screen.type === "analysis") return "";
  if (screen.type === "color") return `
    <div class="bottom-bar bottom-bar--back-only">
      <button class="icon-button" data-action="back" aria-label="Назад"><span aria-hidden="true">←</span></button>
    </div>
  `;
  if (screen.type === "antiSwipe" && Object.keys(state.anti_decisions || {}).length < antiCards.length) return "";
  if (screen.type === "bonus") return `
    <div class="bottom-bar bottom-bar--back-only">
      <button class="icon-button" data-action="back" aria-label="Назад"><span aria-hidden="true">←</span></button>
    </div>
  `;
  if (screen.type === "nextStep") return `
    <div class="bottom-bar">
      <button class="icon-button" data-action="back" aria-label="Назад"><span aria-hidden="true">←</span></button>
      <button class="primary-button" data-action="restart"><span>Пройти заново</span></button>
    </div>
  `;
  const disabled = !canContinue(screen);
  const label = screen.type === "contact" ? "Показать результат" : screen.type === "directions" ? "Получить сюрприз" : "Дальше";
  return `
    <div class="bottom-bar">
      <button class="icon-button" data-action="back" aria-label="Назад"><span aria-hidden="true">←</span></button>
      <button class="primary-button" data-action="next" ${disabled ? "disabled" : ""}>
        <span>${label}</span><span aria-hidden="true">→</span>
      </button>
    </div>
  `;
}

function bindScreen(screen) {
  app.querySelectorAll("[data-action='next']").forEach((button) => button.addEventListener("click", () => goNext()));
  app.querySelectorAll("[data-action='back']").forEach((button) => button.addEventListener("click", () => goBack()));
  app.querySelectorAll("[data-action='restart']").forEach((button) => button.addEventListener("click", restart));

  app.querySelectorAll("[data-field]").forEach((input) => {
    input.addEventListener("input", (event) => {
      const key = event.currentTarget.dataset.field;
      state[key] = event.currentTarget.value.trimStart();
      state.answers_by_step[screen.id] = state[key];
      syncDerived();
      persistState();
      updateCta(screen);
    });
  });

  app.querySelectorAll("[data-lead]").forEach((input) => {
    input.addEventListener("input", (event) => {
      const key = event.currentTarget.dataset.lead;
      state.lead[key] = event.currentTarget.value.trim();
      persistState();
      updateCta(screen);
    });
  });

  app.querySelectorAll("[data-select-single]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const key = event.currentTarget.dataset.selectSingle;
      const value = event.currentTarget.dataset.value;
      state[key] = value;
      state.answers_by_step[screen.id] = value;
      syncDerived();
      persistState();
      if (screen.autoAdvance) {
        window.setTimeout(() => goNext(), 160);
        return;
      }
      render("stay");
    });
  });

  app.querySelectorAll("[data-toggle]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const key = event.currentTarget.dataset.toggle;
      const value = event.currentTarget.dataset.value;
      const list = new Set(state[key] || []);
      list.has(value) ? list.delete(value) : list.add(value);
      state[key] = [...list];
      state.answers_by_step[screen.id] = state[key];
      syncDerived();
      persistState();
      event.currentTarget.classList.toggle("is-selected");
      updateCta(screen);
    });
  });

  app.querySelectorAll("[data-color-id]").forEach((button) => button.addEventListener("click", (event) => handleColorSelect(screen, event.currentTarget.dataset.colorId)));

  if (screen.type === "analysis") startAnalysis(screen);
  if (screen.type === "contexts") bindContexts(screen);
  if (screen.type === "dayLine") bindDayLine(screen);
  if (screen.type === "battery") bindLimitedChoice(screen, "battery");
  if (screen.type === "longPress") bindLongPress(screen);
  if (screen.type === "future") bindLimitedChoice(screen, "future");
  if (screen.type === "workBuilder") bindWorkBuilder(screen);
  if (screen.type === "antiSwipe") bindAntiSwipe(screen);
  if (screen.type === "changeMode") bindChangeMode(screen);
  if (screen.type === "backpack") bindLimitedChoice(screen, "backpack");
  if (screen.type === "bonus") bindBonus(screen);
}

async function handleColorSelect(screen, colorId) {
  const order = [...(state.color_order || [])];
  if (order.includes(colorId)) return;

  order.push(colorId);
  state.color_order = order;
  state.color_first_choices = order.slice(0, 2);
  state.color_last_choices = order.slice(-2);
  state.answers_by_step[screen.id] = [...order];
  state.color_interpretation = buildColorInterpretation(order);
  syncDerived();
  persistState();

  await saveStep("color_selected", {
    event_name: "color_selected",
    step: screen.id,
    selected_color: colorId,
    selected_position: order.length,
    remaining_colors: colorOptions.length - order.length,
  });

  if (order.length === colorOptions.length) {
    await saveStep("color_step_completed", { event_name: "color_step_completed", step: screen.id, color_order: order });
    state.last_step = "profile_analysis";
    persistState();
  }
  render(order.length === colorOptions.length ? "forward" : "stay");
}

function startAnalysis(screen) {
  saveStep("analysis_loader_view", getAnalysisPayload(screen, "analysis_loader_view"));
  analysisTimer = window.setTimeout(async () => {
    await goNext();
  }, screen.duration || 2800);
}

function getAnalysisPayload(screen, eventName) {
  return {
    event_name: eventName,
    loader_id: screen.loaderId || screen.id,
    current_step: screen.id,
    outcome: state.outcome || getOutcome(state.score),
    score_snapshot: { ...state.score },
  };
}

function bindContexts(screen) {
  app.querySelectorAll("[data-context-card]").forEach((card) => {
    card.addEventListener("dragstart", (event) => event.dataTransfer.setData("text/plain", event.currentTarget.dataset.contextCard));
    card.addEventListener("click", (event) => {
      if (event.currentTarget.dataset.dragged === "true") {
        event.currentTarget.dataset.dragged = "";
        return;
      }
      const item = event.currentTarget.dataset.contextCard;
      const current = state.context_map[item] || "neutral";
      const next = current === "neutral" ? "positive" : current === "positive" ? "negative" : "neutral";
      setContext(item, next, screen);
    });
    card.addEventListener("pointerdown", (event) => {
      contextDrag = {
        item: event.currentTarget.dataset.contextCard,
        card: event.currentTarget,
        startX: event.clientX,
        startY: event.clientY,
        moved: false,
      };
      event.currentTarget.setPointerCapture?.(event.pointerId);
    });
    card.addEventListener("pointermove", (event) => {
      if (!contextDrag || contextDrag.card !== event.currentTarget) return;
      const dx = event.clientX - contextDrag.startX;
      const dy = event.clientY - contextDrag.startY;
      if (Math.hypot(dx, dy) < 10) return;
      contextDrag.moved = true;
      event.preventDefault();
      event.currentTarget.classList.add("is-dragging");
      event.currentTarget.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
    });
    card.addEventListener("pointerup", (event) => {
      if (!contextDrag || contextDrag.card !== event.currentTarget) return;
      const drag = contextDrag;
      contextDrag = null;
      event.currentTarget.classList.remove("is-dragging");
      event.currentTarget.style.transform = "";
      if (!drag.moved) return;
      event.preventDefault();
      event.currentTarget.dataset.dragged = "true";
      event.currentTarget.style.visibility = "hidden";
      const zone = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-drop-zone]");
      event.currentTarget.style.visibility = "";
      if (zone) setContext(drag.item, zone.dataset.dropZone, screen);
    });
  });
  app.querySelectorAll("[data-drop-zone]").forEach((zone) => {
    zone.addEventListener("dragover", (event) => event.preventDefault());
    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      const item = event.dataTransfer.getData("text/plain");
      setContext(item, zone.dataset.dropZone, screen);
    });
  });
}

function setContext(item, zone, screen) {
  state.context_map = { ...(state.context_map || {}), [item]: zone };
  state.answers_by_step[screen.id] = state.context_map;
  syncDerived();
  persistState();
  render("stay");
}

function bindDayLine(screen) {
  const canvas = app.querySelector(".day-canvas");
  if (!canvas) return;
  dayCanvasCtx = canvas.getContext("2d");
  drawDayLine();

  const start = (event) => {
    event.preventDefault();
    dayDrawing = true;
    state.day_line_points = [];
    canvas.setPointerCapture?.(event.pointerId);
    addDayPoint(getCanvasPointer(event), canvas, screen);
  };
  const move = (event) => {
    if (!dayDrawing) return;
    event.preventDefault();
    addDayPoint(getCanvasPointer(event), canvas, screen);
  };
  const end = (event) => {
    if (!dayDrawing) return;
    event?.preventDefault?.();
    dayDrawing = false;
    if ((state.day_line_points || []).length < 2) addDayPoint(getCanvasPointer(event), canvas, screen);
    finishDayLine(screen);
  };

  canvas.addEventListener("pointerdown", (event) => {
    start(event);
  });
  canvas.addEventListener("pointermove", (event) => {
    move(event);
  });
  canvas.addEventListener("pointerup", end);
  canvas.addEventListener("pointercancel", end);
  window.addEventListener("pointerup", end);

  canvas.addEventListener("mousedown", (event) => {
    if (window.PointerEvent) return;
    start(event);
  });
  window.addEventListener("mousemove", (event) => {
    if (window.PointerEvent) return;
    move(event);
  });
  window.addEventListener("mouseup", (event) => {
    if (window.PointerEvent) return;
    end(event);
  });
  canvas.addEventListener("touchstart", (event) => {
    if (window.PointerEvent) return;
    start(event);
  }, { passive: false });
  canvas.addEventListener("touchmove", (event) => {
    if (window.PointerEvent) return;
    move(event);
  }, { passive: false });
  canvas.addEventListener("touchend", (event) => {
    if (window.PointerEvent) return;
    end(event);
  }, { passive: false });
}

function getCanvasPointer(event) {
  const source = event?.touches?.[0] || event?.changedTouches?.[0] || event;
  return {
    clientX: source?.clientX ?? 0,
    clientY: source?.clientY ?? 0,
  };
}

function addDayPoint(pointEvent, canvas, screen) {
  const rect = canvas.getBoundingClientRect();
  const x = clamp((pointEvent.clientX - rect.left) / rect.width, 0, 1);
  const y = clamp(1 - (pointEvent.clientY - rect.top) / rect.height, 0, 1);
  const points = state.day_line_points || [];
  const last = points.at(-1);
  if (!last || Math.abs(x - last.x) > 0.01) points.push({ x, y });
  state.day_line_points = points.slice(-90);
  state.answers_by_step[screen.id] = { points: state.day_line_points, pattern: state.profile.dayLinePattern };
  drawDayLine();
}

function finishDayLine(screen) {
  state.profile.dayLinePattern = analyzeDayLine(state.day_line_points || []);
  state.answers_by_step[screen.id] = { points: state.day_line_points, pattern: state.profile.dayLinePattern };
  syncDerived();
  persistState();
  render("stay");
}

function drawDayLine() {
  const canvas = app.querySelector(".day-canvas");
  if (!canvas) return;
  const ctx = dayCanvasCtx || canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#f4f4f6";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#dddde4";
  ctx.lineWidth = 2;
  for (let i = 1; i < 3; i += 1) {
    ctx.beginPath();
    ctx.moveTo((width / 3) * i, 0);
    ctx.lineTo((width / 3) * i, height);
    ctx.stroke();
  }
  ctx.strokeStyle = "#cfcfd7";
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();
  const points = state.day_line_points || [];
  if (!points.length) return;
  ctx.strokeStyle = "#3d3bff";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  points.forEach((point, index) => {
    const x = point.x * width;
    const y = (1 - point.y) * height;
    index ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  });
  ctx.stroke();
}

function bindLimitedChoice(screen, type) {
  const config = {
    battery: { selector: "[data-battery]", listKey: "battery_drainers", max: 4, drop: "[data-drop-battery]" },
    future: { selector: "[data-future]", listKey: "future_desires", max: 3, drop: "[data-drop-future]" },
    backpack: { selector: "[data-backpack]", listKey: "next_chapter_items", max: 5, drop: "[data-drop-backpack]" },
  }[type];

  app.querySelectorAll(config.selector).forEach((button) => {
    button.addEventListener("dragstart", (event) => event.dataTransfer.setData("text/plain", getLimitedValue(event.currentTarget, type)));
    bindLimitedPointerDrag(button, config, screen, type);
    button.addEventListener("click", (event) => {
      if (event.currentTarget.dataset.skipClick === "true") {
        event.currentTarget.dataset.skipClick = "";
        return;
      }
      toggleLimited(getLimitedValue(event.currentTarget, type), config, screen);
    });
  });

  const drop = app.querySelector(config.drop);
  if (drop) {
    drop.addEventListener("dragover", (event) => event.preventDefault());
    drop.addEventListener("drop", (event) => {
      event.preventDefault();
      toggleLimited(event.dataTransfer.getData("text/plain"), config, screen, true);
    });
  }
}

function bindLimitedPointerDrag(button, config, screen, type) {
  let drag = null;

  button.addEventListener("pointerdown", (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    drag = {
      pointerId: event.pointerId,
      item: getLimitedValue(button, type),
      startX: event.clientX,
      startY: event.clientY,
      active: false,
    };
    button.setPointerCapture?.(event.pointerId);
  });

  button.addEventListener("pointermove", (event) => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.active && Math.hypot(dx, dy) < 7) return;
    drag.active = true;
    event.preventDefault();
    button.classList.add("is-pointer-dragging");
    button.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
  });

  const finish = (event) => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    const wasActive = drag.active;
    const item = drag.item;
    drag = null;
    button.releasePointerCapture?.(event.pointerId);
    button.classList.remove("is-pointer-dragging");
    button.style.transform = "";
    if (!wasActive) return;

    event.preventDefault();
    button.dataset.skipClick = "true";
    const drop = app.querySelector(config.drop);
    const rect = drop?.getBoundingClientRect();
    const isOverDrop = rect && event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (isOverDrop) toggleLimited(item, config, screen, true);
  };

  button.addEventListener("pointerup", finish);
  button.addEventListener("pointercancel", finish);
}

function getLimitedValue(button, type) {
  if (type === "battery") return button.dataset.battery;
  if (type === "future") return button.dataset.future;
  if (type === "backpack") return button.dataset.backpack;
  return button.textContent.trim();
}

function toggleLimited(item, config, screen, forceAdd = false) {
  const list = [...(state[config.listKey] || [])];
  const exists = list.includes(item);
  let next = list;
  if (exists && !forceAdd) next = list.filter((entry) => entry !== item);
  if (!exists && list.length < config.max) next = [...list, item];
  if (!exists && list.length >= config.max) next = [...list.slice(0, config.max - 1), item];
  state[config.listKey] = next;
  state.answers_by_step[screen.id] = next;
  syncDerived();
  persistState();
  render("stay");
}

function bindLongPress(screen) {
  app.querySelectorAll("[data-long-pain]").forEach((button) => {
    const select = () => {
      state.long_term_pain = button.dataset.longPain;
      state.answers_by_step[screen.id] = state.long_term_pain;
      syncDerived();
      persistState();
      button.classList.remove("is-pressing");
      button.classList.add("is-selected", "is-burst");
      updateCta(screen);
      longPressAdvanceTimer = window.setTimeout(() => goNext(), 680);
    };
    button.addEventListener("pointerdown", () => {
      button.classList.add("is-pressing");
      longPressTimer = window.setTimeout(select, 1300);
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach((eventName) => {
      button.addEventListener(eventName, () => {
        window.clearTimeout(longPressTimer);
        button.classList.remove("is-pressing");
      });
    });
  });
}

function bindWorkBuilder(screen) {
  app.querySelectorAll("[data-builder]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const key = event.currentTarget.dataset.builder;
      const value = event.currentTarget.dataset.value;
      const multiple = event.currentTarget.dataset.multiple === "true";
      const work = { ...emptyProfile().normalWork, ...(state.normal_work || {}) };
      if (multiple) {
        const current = new Set(work[key] || []);
        current.has(value) ? current.delete(value) : current.size < 3 && current.add(value);
        work[key] = [...current];
      } else {
        work[key] = value;
      }
      state.normal_work = work;
      state.answers_by_step[screen.id] = work;
      syncDerived();
      persistState();
      render("stay");
    });
  });
}

function bindAntiSwipe(screen) {
  app.querySelectorAll("[data-anti-decision]").forEach((button) => {
    button.addEventListener("click", (event) => {
      decideAnti(event.currentTarget.dataset.value, event.currentTarget.dataset.antiDecision, screen);
    });
  });
  const card = app.querySelector("[data-swipe-card]");
  if (!card) return;
  let startX = 0;
  card.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
    card.setPointerCapture(event.pointerId);
  });
  card.addEventListener("pointerup", (event) => {
    const diff = event.clientX - startX;
    if (Math.abs(diff) < 80) return;
    decideAnti(card.dataset.swipeCard, diff < 0 ? "remove" : "keep", screen);
  });
}

function decideAnti(item, decision, screen) {
  state.anti_decisions = { ...(state.anti_decisions || {}), [item]: decision };
  state.answers_by_step[screen.id] = state.anti_decisions;
  syncDerived();
  persistState();
  if (Object.keys(state.anti_decisions).length >= antiCards.length) {
    window.setTimeout(() => render("stay"), 120);
    return;
  }
  render("stay");
}

function bindChangeMode(screen) {
  app.querySelectorAll("[data-change-mode]").forEach((button) => {
    button.addEventListener("click", (event) => {
      state.change_mode = event.currentTarget.dataset.changeMode;
      state.answers_by_step[screen.id] = state.change_mode;
      syncDerived();
      persistState();
      render("stay");
    });
  });
}

function bindBonus(screen) {
  if (!state.answers_by_step.bonus_screen_viewed) {
    state.answers_by_step.bonus_screen_viewed = new Date().toISOString();
    trackBonusEvent("bonus_screen_view");
  }
  app.querySelectorAll("[data-bonus-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      handleBonusAction(event.currentTarget.dataset.bonusAction);
    });
  });

  bindGlassInteraction(screen);
  if (state.bonus_game_state === "breaking" && !state.reward?.revealedAt) bonusRevealTimer = window.setTimeout(() => revealBonus("glass"), 900);
  if (state.reward?.revealedAt) startBonusCountdown();
}

function handleBonusAction(action) {
  if (action === "start") {
    state.bonus_game_state = "glass";
    state.bonus_hint_level = 0;
    state.bonus_cracks = 0;
    persistState();
    trackBonusEvent("bonus_game_start");
    render("stay");
    return;
  }

  if (action === "copy") {
    copyPromoCode();
    return;
  }

  if (action === "reveal") {
    revealBonus("manual");
    return;
  }

  if (action === "consultation") {
    activateBonusReward();
    trackBonusEvent("consultation_cta_click");
    return;
  }

  if (action === "directions") {
    state.last_step = "directions";
    persistState();
    render("forward");
    return;
  }

  if (action === "save") {
    trackBonusEvent("secondary_save_bonus_click");
  }
}

function revealBonus(source) {
  const result = buildResult();
  const content = bonusContentByOutcome[result.outcome];
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  state.bonus_game_state = "reveal";
  state.bonus_hint_level = 0;
  const promoCode = state.reward?.promoCode || generatePromoCode(state.profile?.name || state.user_name, now);
  state.reward = {
    ...(state.reward || {}),
    mechanic: "break_glass_of_doubt",
    outcome: result.outcome,
    promoCode,
    discountPercent: 60,
    revealedAt: state.reward?.revealedAt || now.toISOString(),
    expiresAt: state.reward?.expiresAt || expiresAt.toISOString(),
    expiresHours: 24,
    consultationCta: content.consultationCta,
    bonusActivated: true,
  };
  state.answers_by_step.bonus = state.reward;
  persistState();
  trackBonusEvent("bonus_revealed", { reveal_source: source });
  render("stay");
}

function activateBonusReward() {
  const result = buildResult();
  const content = bonusContentByOutcome[result.outcome];
  const now = new Date();
  state.reward = {
    ...(state.reward || {}),
    mechanic: "break_glass_of_doubt",
    outcome: result.outcome,
    promoCode: state.reward?.promoCode || generatePromoCode(state.profile?.name || state.user_name, now),
    discountPercent: 60,
    revealedAt: state.reward?.revealedAt || now.toISOString(),
    expiresAt: state.reward?.expiresAt || new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
    expiresHours: 24,
    consultationCta: content.consultationCta,
    bonusActivated: true,
    consultationRequested: true,
    activatedAt: now.toISOString(),
  };
  state.answers_by_step.bonus = state.reward;
  syncDerived();
  persistState();
  render("stay");
}

function trackBonusEvent(eventName, extra = {}) {
  const result = buildResult();
  const content = bonusContentByOutcome[result.outcome];
  const countdown = getRewardCountdown(state.reward);
  saveStep(eventName, {
    event_name: eventName,
    outcome: result.outcome,
    archetype: result.archetype.name,
    promoCode: state.reward?.promoCode || "",
    timerRemaining: countdown.remainingMs,
    consultationCtaText: content.consultationCta,
    ...extra,
  });
}

function bindGlassInteraction(screen) {
  const pane = app.querySelector("[data-glass-pane]");
  if (!pane) return;

  const addCrack = (event) => {
    const rect = pane.getBoundingClientRect();
    const point = { x: event.clientX, y: event.clientY };
    if (state.bonus_game_state === "intro") state.bonus_game_state = "glass";
    state.bonus_cracks = Math.min(GLASS_CRACK_TARGET, (state.bonus_cracks || 0) + 1);
    const crack = document.createElement("span");
    crack.className = `glass-crack glass-crack--live glass-crack--${state.bonus_cracks}`;
    crack.style.left = `${Math.max(8, Math.min(rect.width - 48, point.x - rect.left))}px`;
    crack.style.top = `${Math.max(8, Math.min(rect.height - 48, point.y - rect.top))}px`;
    pane.querySelector(".glass-crack-layer")?.append(crack);
    pane.closest(".glass-interaction")?.querySelector(".glass-progress span")?.style.setProperty("width", `${Math.min(100, Math.round((state.bonus_cracks / GLASS_CRACK_TARGET) * 100))}%`);
    persistState();
    if (state.bonus_cracks >= GLASS_CRACK_TARGET) completeGlassInteraction();
  };

  pane.addEventListener("pointerdown", (event) => {
    pane.setPointerCapture?.(event.pointerId);
    if (!state.answers_by_step.glass_interaction_started) {
      state.answers_by_step.glass_interaction_started = new Date().toISOString();
      trackBonusEvent("glass_interaction_start");
    }
    addCrack(event);
  });
}

function completeGlassInteraction() {
  if (state.bonus_game_state === "breaking") return;
  state.bonus_game_state = "breaking";
  state.answers_by_step.glass_interaction_completed = new Date().toISOString();
  persistState();
  trackBonusEvent("glass_interaction_complete");
  render("stay");
}

async function copyPromoCode() {
  const code = state.reward?.promoCode || generatePromoCode(state.profile?.name || state.user_name, new Date());
  try {
    await navigator.clipboard?.writeText(code);
  } catch {
    const input = document.createElement("input");
    input.value = code;
    document.body.append(input);
    input.select();
    document.execCommand?.("copy");
    input.remove();
  }
  state.promo_copied = true;
  state.answers_by_step.promo_copied = code;
  persistState();
  trackBonusEvent("promo_copied");
  render("stay");
}

function startBonusCountdown() {
  updateBonusCountdown();
  bonusCountdownTimer = window.setInterval(updateBonusCountdown, 1000);
}

function updateBonusCountdown() {
  const countdown = getRewardCountdown(state.reward);
  const node = app.querySelector("[data-countdown]");
  if (node) node.textContent = countdown.label;
  if (!countdown.isExpired) return;
  app.querySelector(".bonus-timer")?.classList.add("is-expired");
  app.querySelector(".consultation-main-cta")?.setAttribute("disabled", "");
  if (!state.answers_by_step.countdown_expired) {
    state.answers_by_step.countdown_expired = new Date().toISOString();
    persistState();
    trackBonusEvent("countdown_expired");
  }
}

function getRewardCountdown(reward) {
  if (!reward?.expiresAt) return { label: "24 : 00 : 00", remainingMs: 24 * 60 * 60 * 1000, isExpired: false };
  const expiresAt = reward.expiresHours === 24 || !reward.revealedAt
    ? reward.expiresAt
    : new Date(new Date(reward.revealedAt).getTime() + 24 * 60 * 60 * 1000).toISOString();
  const remainingMs = Math.max(0, new Date(expiresAt).getTime() - Date.now());
  const totalHours = Math.floor(remainingMs / 3600000);
  const minutes = Math.floor((remainingMs % 3600000) / 60000);
  const seconds = Math.floor((remainingMs % 60000) / 1000);
  const label = `${String(totalHours).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
  return { label, remainingMs, isExpired: remainingMs <= 0 };
}

function generatePromoCode(name, date) {
  const cleanName = transliterate(name || "")
    .replace(/[^a-zA-Zа-яА-ЯёЁ]/g, "")
    .trim();
  const baseName = cleanName || "USER";
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${capitalize(baseName)}${dd}${mm}${yyyy}`;
}

function capitalize(value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "USER";
}

function transliterate(value) {
  const map = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "i",
    к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u",
    ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e",
    ю: "yu", я: "ya",
  };
  return String(value).split("").map((char) => {
    const lower = char.toLowerCase();
    const next = map[lower] ?? char;
    return char === lower ? next : capitalize(next);
  }).join("");
}

function canContinue(screen) {
  if (screen.type === "input") return Boolean(state[screen.answerKey]?.trim());
  if (screen.type === "cards") return Boolean(state[screen.answerKey]);
  if (screen.type === "chips" || screen.type === "rows") return Array.isArray(state[screen.answerKey]) && state[screen.answerKey].length > 0;
  if (screen.type === "contexts") return Object.values(state.context_map || {}).some((value) => value !== "neutral");
  if (screen.type === "dayLine") return Boolean(state.profile.dayLinePattern);
  if (screen.type === "battery") return (state.battery_drainers || []).length > 0;
  if (screen.type === "longPress") return Boolean(state.long_term_pain);
  if (screen.type === "future") return (state.future_desires || []).length === 3;
  if (screen.type === "workBuilder") {
    const work = state.normal_work || {};
    return Boolean(work.rhythm && work.format && work.mainValue && work.tasks?.length);
  }
  if (screen.type === "changeMode") return Boolean(state.change_mode);
  if (screen.type === "backpack") return true;
  if (screen.type === "contact") return isEmail(state.lead.email) && state.lead.phone.length >= 5;
  return true;
}

function updateCta(screen) {
  const button = app.querySelector("[data-action='next']");
  if (button) button.disabled = !canContinue(screen);
}

async function goNext() {
  const screen = getCurrentScreen();
  if (!canContinue(screen)) return;
  syncDerived();

  if (screen.type === "contact") {
    state.outcome = getOutcome(state.score);
    state.profile.outcome = state.outcome;
    state.completed = true;
    await saveFinalLead();
  } else if (screen.id === "welcome") {
    await saveStep("welcome_started", "start");
  } else if (screen.type === "analysis") {
    await saveStep("analysis_loader_complete", getAnalysisPayload(screen, "analysis_loader_complete"));
  } else {
    await saveStep(screen.id, getAnswerByScreen(screen));
  }

  const currentIndex = getScreenIndex(screen.id);
  const nextScreen = screensConfig[currentIndex + 1];
  if (!nextScreen) {
    state.completed = true;
    persistState();
    render("forward");
    return;
  }
  state.last_step = nextScreen.id;
  persistState();
  render("forward");
}

async function goBack() {
  const currentIndex = getScreenIndex();
  let previous = screensConfig[Math.max(0, currentIndex - 1)];
  if (previous?.type === "analysis") {
    previous = screensConfig[Math.max(0, currentIndex - 2)];
  }
  state.last_step = previous.id;
  state.completed = false;
  persistState();
  await saveStep("back_to_" + previous.id, null);
  render("back");
}

function restart() {
  const fresh = hydrateState();
  removeStoredState(STORAGE_KEY);
  Object.keys(state).forEach((key) => delete state[key]);
  Object.assign(state, {
    ...fresh,
    session_id: createSessionId(),
    started_at: new Date().toISOString(),
    last_step: "welcome",
    completed: false,
    answers_by_step: {},
    lead: { email: "", phone: "" },
    bonus_game_state: "intro",
    bonus_hint_level: 0,
    reward: null,
    profile: emptyProfile(),
    score: emptyScore(),
    outcome: "",
  });
  persistState();
  render("back");
}

function getAnswerByScreen(screen) {
  const map = {
    contexts: state.context_map,
    dayLine: { points: state.day_line_points, pattern: state.profile.dayLinePattern },
    battery: state.battery_drainers,
    longPress: state.long_term_pain,
    future: state.future_desires,
    workBuilder: state.normal_work,
    antiSwipe: state.anti_decisions,
    criteriaPreview: buildCriteria(),
    changeMode: state.change_mode,
    backpack: state.next_chapter_items,
    trajectory: { dominant: getDominantOutcomeVector(), outcome: getOutcome(state.score) },
    contact: state.lead,
    outcome: buildResult(),
    transitionMap: buildResult().transitionMap,
    directions: buildResult().directions,
    bonus: buildResult().reward,
    nextStep: buildResult().finalCta,
  };
  if (screen.type in map) return map[screen.type];
  if (!screen.answerKey) return null;
  return state[screen.answerKey];
}

function syncDerived(target = state) {
  target.profile = buildProfile(target);
  target.score = computeScore(target);
  target.outcome = getOutcome(target.score);
  target.profile.outcome = target.outcome;
  target.profile.criteria = buildCriteria(target).criteria;
  target.result = buildResult(target);
}

function buildProfile(source = state) {
  const context = source.context_map || {};
  const profile = mergeProfile(emptyProfile(), source.profile || {});
  profile.name = source.user_name || "";
  profile.generation = source.generation || "";
  profile.selectedFeelings = source.emotional_tags || [];
  profile.bodySignals = source.physical_tags || [];
  profile.colorOrder = source.color_order || [];
  profile.positiveContexts = contextCards.filter((card) => context[card] === "positive");
  profile.negativeContexts = contextCards.filter((card) => context[card] === "negative");
  profile.dayLinePattern = profile.dayLinePattern || analyzeDayLine(source.day_line_points || []);
  profile.batteryDrainers = source.battery_drainers || [];
  profile.longTermPain = source.long_term_pain || "";
  profile.futureDesires = source.future_desires || [];
  profile.normalWork = { ...emptyProfile().normalWork, ...(source.normal_work || {}) };
  profile.antiCriteria = getAntiCriteria(source);
  profile.changeMode = source.change_mode || "";
  profile.nextChapterItems = source.next_chapter_items || [];
  return profile;
}

function computeScore(source = state) {
  const profile = source.profile || buildProfile(source);
  const score = emptyScore();
  const apply = (rule) => {
    if (!rule) return;
    Object.entries(rule).forEach(([key, value]) => {
      score[key] = (score[key] || 0) + value;
    });
  };

  profile.selectedFeelings.forEach((item) => apply(rules.initialFeeling[item]));
  profile.bodySignals.forEach((item) => apply(rules.bodySignal[item]));
  profile.negativeContexts.forEach((item) => apply(rules.contextNegative[item]));
  profile.positiveContexts.forEach((item) => apply(rules.contextPositive[item]));
  apply(rules.dayLine[profile.dayLinePattern]);
  profile.batteryDrainers.forEach((item) => apply(rules.battery[item]));
  apply(rules.pain[profile.longTermPain]);
  profile.futureDesires.forEach((item) => apply(rules.future[item]));
  apply(rules.rhythm[profile.normalWork.rhythm]);
  apply(rules.format[profile.normalWork.format]);
  (profile.normalWork.tasks || []).forEach((item) => apply(rules.tasks[item]));
  apply(rules.mainValue[profile.normalWork.mainValue]);
  profile.antiCriteria.forEach((item) => apply(rules.anti[item]));
  apply(rules.change[profile.changeMode]);
  profile.nextChapterItems.forEach((item) => apply(rules.backpack[item]));

  return score;
}

function getAntiCriteria(source = state) {
  return Object.entries(source.anti_decisions || {})
    .filter(([, decision]) => decision === "remove")
    .map(([item]) => item);
}

function getOutcome(score) {
  if (score.burnout >= 7 && score.work_link >= 4) return "emotional_exhaustion";
  if (score.growth >= 7 && score.burnout < score.growth) return "growth_ceiling";
  if (score.misfit >= 6) return "wrong_place";
  if (score.money_freedom >= 6) return "money_freedom";
  if (score.boredom + score.exploration >= 7 && score.burnout < 7) return "soft_search";
  if (score.unclear >= 6) return "wrong_place";
  return getHighestFallback(score);
}

function getHighestFallback(score) {
  const candidates = [
    ["emotional_exhaustion", score.burnout + score.stress + score.work_link],
    ["growth_ceiling", score.growth],
    ["wrong_place", score.misfit + score.unclear],
    ["money_freedom", score.money_freedom],
    ["soft_search", score.boredom + score.exploration],
  ];
  return candidates.sort((a, b) => b[1] - a[1])[0][0];
}

function buildResult(source = state) {
  const score = source.score || computeScore(source);
  const profile = source.profile || buildProfile(source);
  const outcome = getOutcome(score);
  const transitionMap = buildTransitionMap(outcome, profile, score);
  return {
    outcome,
    archetype: archetypes[outcome],
    transitionMap,
    directions: directionRecommendations[outcome],
    offer: offers[outcome],
    finalCta: finalCtas[outcome],
    reward: source.reward || null,
    score,
    profile,
  };
}

function buildTransitionMap(outcome, profile, score) {
  return {
    currentState: getCurrentStateText(outcome),
    restoreNeeds: getRestoreNeeds(profile, score),
    safeChangeFormat: getSafeChangeFormat(profile.changeMode),
    nextStep: getTransitionNextStep(outcome),
  };
}

function getCurrentStateText(outcome) {
  return {
    emotional_exhaustion: "много напряжения, мало восстановления",
    growth_ceiling: "есть ощущение потолка и нехватки роста",
    wrong_place: "есть ощущение несовпадения с текущей средой",
    money_freedom: "не хватает свободы, дохода или контроля",
    soft_search: "жизни не хватает новизны и интереса",
  }[outcome];
}

function getRestoreNeeds(profile, score) {
  const items = [];
  const add = (value) => {
    const clean = normalizeNeed(value);
    if (clean && !items.includes(clean)) items.push(clean);
  };

  profile.futureDesires.forEach(add);
  profile.nextChapterItems.forEach(add);

  const dominantNeeds = [
    ["burnout", "энергию"],
    ["stress", "спокойствие"],
    ["growth", "развитие"],
    ["money_freedom", "доход и свободу"],
    ["boredom", "интерес"],
    ["exploration", "новые возможности"],
    ["misfit", "смысл"],
    ["unclear", "ясность"],
    ["low_risk", "стабильность"],
    ["self_efficacy", "уверенность"],
  ];

  dominantNeeds
    .sort((a, b) => (score[b[0]] || 0) - (score[a[0]] || 0))
    .slice(0, 3)
    .forEach(([, need]) => add(need));

  return items.slice(0, 3).length ? items.slice(0, 3) : archetypes[getOutcome(score)].restore.slice(0, 3);
}

function normalizeNeed(value) {
  return {
    Спокойствие: "спокойствие",
    Энергия: "энергию",
    Деньги: "рост дохода",
    Свобода: "свободу",
    Интерес: "интерес",
    Уверенность: "уверенность",
    Развитие: "развитие",
    Творчество: "творчество",
    Стабильность: "стабильность",
    Смысл: "смысл",
    "Время на себя": "время на себя",
    "Ощущение “я на своём месте”": "ощущение “я на своём месте”",
    "Рост дохода": "рост дохода",
    "Свободу и гибкость": "свободу и гибкость",
    "Ощущение развития": "развитие",
    "Уверенность в себе": "уверенность",
    "Интерес к тому, что делаю": "интерес",
    "Баланс жизни и работы": "баланс",
    "Больше времени на себя и близких": "время на себя и близких",
    "Понимание, куда двигаться дальше": "ясность",
    "Энергию и мотивацию": "энергию",
    "Ощущение новых возможностей": "новые возможности",
    "Комфортную рабочую среду": "комфортную среду",
  }[value] || value;
}

function getSafeChangeFormat(changeMode) {
  return {
    "Маленький шаг": "начать с небольшого навыка или мини-примерки",
    Марафон: "постепенно перестроить траекторию",
    "Полёт на Луну": "исследовать новую профессиональную роль",
    Пауза: "сначала снизить давление и выбрать мягкий вход",
  }[changeMode] || "начать с безопасной примерки без резких решений";
}

function getTransitionNextStep(outcome) {
  return {
    emotional_exhaustion: "посмотреть направления с мягким входом и спокойным темпом",
    growth_ceiling: "посмотреть направления для роста и апгрейда навыков",
    wrong_place: "примерить несколько направлений и сравнить ощущения",
    money_freedom: "посмотреть направления с потенциалом дохода и гибкости",
    soft_search: "выбрать лёгкое направление для старта и интереса",
  }[outcome];
}

function getTopVectors(limit = 3) {
  return Object.entries(state.score)
    .filter(([key]) => vectorLabels[key])
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

function buildCriteria(source = state) {
  const profile = source.profile || buildProfile(source);
  const outcome = outcomeConfig[source.outcome || getOutcome(source.score || computeScore(source))];
  const criteria = [];
  const avoid = [];
  const add = (value) => {
    if (value && !criteria.includes(value)) criteria.push(value);
  };
  const avoidAdd = (value) => {
    if (value && !avoid.includes(value)) avoid.push(value);
  };

  profile.futureDesires.forEach((item) => add(mapDesireCriterion(item)));
  add(mapValueCriterion(profile.normalWork.mainValue));
  add(mapRhythmCriterion(profile.normalWork.rhythm));
  add(mapFormatCriterion(profile.normalWork.format));
  (profile.normalWork.tasks || []).slice(0, 2).forEach((item) => add(mapTaskCriterion(item)));
  profile.nextChapterItems.forEach((item) => add(mapBackpackCriterion(item)));
  outcome.criteria.forEach(add);
  profile.antiCriteria.forEach((item) => {
    avoidAdd(mapAntiAvoid(item));
    add(mapAntiCriterion(item));
  });

  return {
    criteria: uniqueClean(criteria).slice(0, 6),
    avoid: uniqueClean(avoid).slice(0, 5),
  };
}

function mapDesireCriterion(item) {
  return {
    Спокойствие: "спокойный темп без лишнего хаоса",
    Энергия: "работа, после которой остаётся ресурс",
    Деньги: "потенциал роста дохода",
    Свобода: "больше свободы в графике и формате",
    Интерес: "задачи, которые возвращают интерес",
    Уверенность: "понятная траектория развития",
    Развитие: "видимый профессиональный рост",
    Творчество: "место для творчества и новых идей",
    Стабильность: "предсказуемость и опора",
    Смысл: "ощущение смысла в работе",
    "Время на себя": "баланс жизни и работы",
    "Ощущение “я на своём месте”": "совпадение задач со своими сильными сторонами",
  }[item];
}

function mapValueCriterion(item) {
  return item ? `главная ценность: ${item.toLowerCase()}` : "";
}

function mapRhythmCriterion(item) {
  return item ? `${item.toLowerCase()} ритм работы` : "";
}

function mapFormatCriterion(item) {
  if (!item || item === "Не важно") return "";
  return item === "Удалённо" ? "возможность работать удалённо" : `${item.toLowerCase()} формат`;
}

function mapTaskCriterion(item) {
  return item ? `задачи: ${item.toLowerCase()}` : "";
}

function mapBackpackCriterion(item) {
  return {
    "Рост дохода": "рост дохода",
    "Свободу и гибкость": "свобода и гибкость",
    "Ощущение развития": "ощущение развития",
    "Уверенность в себе": "больше уверенности в себе",
    "Интерес к тому, что делаю": "интерес к задачам",
    Стабильность: "стабильность",
    "Баланс жизни и работы": "баланс жизни и работы",
    "Больше времени на себя и близких": "время на себя и близких",
    "Понимание, куда двигаться дальше": "ясный следующий шаг",
    "Энергию и мотивацию": "энергия и мотивация",
    "Ощущение новых возможностей": "новые возможности",
    "Комфортную рабочую среду": "комфортная рабочая среда",
  }[item];
}

function mapAntiCriterion(item) {
  return {
    "Чёткий график": "меньше зависимости от жёсткого графика",
    "Низкий доход": "понятный рост дохода",
    "Отсутствие понятного роста": "понятный рост и развитие",
    Нестабильность: "больше стабильности",
    "Работа без смысла": "работа со смыслом",
  }[item] || "";
}

function mapAntiAvoid(item) {
  return {
    "Много созвонов": "много созвонов",
    "Срочность и горящие дедлайны": "постоянной срочности",
    "Чёткий график": "жёсткого графика",
    "Однообразные задачи": "однообразных задач",
    "Отсутствие понятного роста": "ролей без понятного роста",
    "Зависимость от начальника": "сильной зависимости от начальника",
    "Низкий доход": "низкого дохода",
    "Много общения": "избыточного общения",
    "Работа без смысла": "работы без смысла",
    Нестабильность: "нестабильности",
  }[item];
}

function uniqueClean(items) {
  return [...new Set(items.filter(Boolean))];
}

function analyzeDayLine(points) {
  if (!points || points.length < 4) return "";
  const sample = (from, to) => {
    const slice = points.filter((point) => point.x >= from && point.x <= to);
    const data = slice.length ? slice : points;
    return average(data.map((point) => point.y));
  };
  const morningY = sample(0, 0.28);
  const middayY = sample(0.36, 0.64);
  const eveningY = sample(0.72, 1);
  const values = points.map((point) => point.y);
  const averageY = average(values);
  const variance = average(values.map((value) => Math.abs(value - averageY)));

  if (averageY < 0.34) return "Не восстанавливаюсь";
  if (variance > 0.26) return "Качели";
  if (morningY < 0.38 && eveningY - morningY > 0.18) return "Тяжёлый старт";
  if (middayY + 0.18 < morningY && middayY + 0.18 < eveningY) return "Рабочая яма";
  if (eveningY + 0.18 < morningY || eveningY + 0.18 < middayY) return "Вечернее обнуление";
  if (averageY > 0.65 && variance < 0.2) return "Есть энергия";
  if (variance < 0.14 && averageY >= 0.38 && averageY <= 0.64) return "Ровно, но без подъёма";
  return "Качели";
}

function getDayLineInsight(pattern) {
  return {
    "Тяжёлый старт": "Похоже, вход в день забирает больше сил, чем сам ритм дальше.",
    "Рабочая яма": "Похоже, основной спад приходится на активную часть дня. Возможно, задачи, коммуникации или ритм сильнее всего забирают ресурс.",
    "Вечернее обнуление": "К вечеру ресурс заметно проседает — это похоже на накопленный расход энергии.",
    "Не восстанавливаюсь": "Линия держится низко почти весь день. Сейчас особенно важны восстановление и спокойный темп.",
    Качели: "Состояние скачет, значит на вас сильно влияют контекст, срочность или внешние события.",
    "Ровно, но без подъёма": "День выглядит ровным, но без подъёма. Возможно, не хватает интереса или новизны.",
    "Есть энергия": "Ресурс есть. Значит, следующий шаг можно строить через рост и исследование нового.",
  }[pattern];
}

function getDominantOutcomeVector() {
  const score = state.score;
  const candidates = [
    ["burnout", score.burnout],
    ["growth", score.growth],
    ["misfit", score.misfit],
    ["money_freedom", score.money_freedom],
    ["boredom", score.boredom + score.exploration],
  ];
  return candidates.sort((a, b) => b[1] - a[1])[0][0];
}

function getBeforeLines(vector) {
  const lines = {
    burnout: ["усталость копится", "сложнее восстанавливаться", "решения откладываются"],
    growth: ["ощущение потолка усиливается", "задачи становятся всё менее интересными", "доход и роль могут застрять"],
    misfit: ["ощущение “не моё” становится сильнее", "всё больше сопротивления", "сложнее понять, куда двигаться"],
    money_freedom: ["меньше ощущения контроля", "финансовая тревога остаётся", "свободы не становится больше"],
    boredom: ["жизнь всё больше на автомате", "меньше интереса", "сложнее начать новое"],
  };
  return lines[vector] || lines.burnout;
}

function buildColorInterpretation(order) {
  const first = order.slice(0, 2);
  const last = order.slice(-2);
  return {
    primary_need: first.join(", "),
    resistance_zone: last.join(", "),
    insight_modifier: getColorModifier(first, last),
  };
}

function getColorModifier(first, last) {
  const hasFirst = (arr) => arr.some((item) => first.includes(item));
  const hasLast = (arr) => arr.some((item) => last.includes(item));
  if (first.includes("black")) return "Есть сигнал сильного внутреннего напряжения и желания резко остановить давление.";
  if (first.includes("gray")) return "Похоже, сейчас хочется меньше шума, меньше давления и больше дистанции.";
  if (hasFirst(["blue", "brown", "gray"])) return "Похоже, сейчас особенно важны спокойствие, пауза и возвращение базового ресурса.";
  if (hasFirst(["red", "yellow"])) return "В состоянии есть запрос на движение и желание снова почувствовать интерес.";
  if (first.includes("green")) return "Вам важно не просто менять, а вернуть ощущение опоры и управляемости.";
  if (first.includes("violet")) return "Для вас важен не только отдых, но и ощущение движения к своему смыслу.";
  if (hasLast(["red", "yellow", "green"])) return "Сейчас может быть сложнее поверить, что перемены доступны и управляемы.";
  if (hasLast(["blue", "brown"])) return "Возможно, вы привыкли не замечать усталость и продолжать без восстановления.";
  return "Цветовой выбор даёт мягкий сигнал, который уточняет первый инсайт.";
}

async function saveFinalLead() {
  syncDerived();
  const payload = {
    lead: state.lead,
    profile: state.profile,
    score: state.score,
    outcome: state.outcome,
    result: state.result,
    createdAt: new Date().toISOString(),
  };
  state.answers_by_step.lead_saved = payload;
  persistState();
  await saveStep("lead_saved", payload);
}

async function saveStep(step, answers) {
  state.timestamp = new Date().toISOString();
  state.viewport = getViewport();
  state.device_type = getDeviceType();
  syncDerived();
  persistState();

  const payload = createSavePayload(step, answers);
  try {
    const response = await fetch(SAVE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    if (!response.ok) throw new Error("Save failed");
    flushSaveQueue();
  } catch {
    enqueueSave(payload);
  }
}

function createSavePayload(step, answers) {
  const eventName = answers && typeof answers === "object" && !Array.isArray(answers) ? answers.event_name : undefined;
  return {
    session_id: state.session_id,
    ...(eventName ? { event_name: eventName } : {}),
    started_at: state.started_at,
    last_step: state.last_step,
    completed: state.completed,
    user_name: state.user_name,
    generation: state.generation,
    emotional_tags: state.emotional_tags,
    physical_tags: state.physical_tags,
    color_order: state.color_order,
    color_first_choices: state.color_first_choices,
    color_last_choices: state.color_last_choices,
    color_interpretation: state.color_interpretation,
    profile: state.profile,
    score: state.score,
    outcome: state.outcome || getOutcome(state.score),
    result: state.result || buildResult(),
    lead: state.lead,
    answers_by_step: state.answers_by_step,
    step,
    answers,
    utm: state.utm,
    referrer: state.referrer,
    landing_url: state.landing_url,
    timestamp: new Date().toISOString(),
    device_type: getDeviceType(),
    viewport: getViewport(),
  };
}

function enqueueSave(payload) {
  const queue = readJson(QUEUE_KEY) || [];
  queue.push(payload);
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue.slice(-50)));
  } catch {
    // Ignore unavailable storage during direct file previews.
  }
}

async function flushSaveQueue() {
  const queue = readJson(QUEUE_KEY) || [];
  if (!queue.length) return;
  const remaining = [];
  for (const payload of queue) {
    try {
      const response = await fetch(SAVE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Queued save failed");
    } catch {
      remaining.push(payload);
    }
  }
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
  } catch {
    // Ignore unavailable storage during direct file previews.
  }
}

function clearTimers() {
  if (analysisTimer) window.clearTimeout(analysisTimer);
  if (longPressTimer) window.clearTimeout(longPressTimer);
  if (longPressAdvanceTimer) window.clearTimeout(longPressAdvanceTimer);
  if (bonusHintTimer) window.clearTimeout(bonusHintTimer);
  if (bonusRevealTimer) window.clearTimeout(bonusRevealTimer);
  if (bonusCaughtTimer) window.clearTimeout(bonusCaughtTimer);
  if (bonusCountdownTimer) window.clearInterval(bonusCountdownTimer);
  analysisTimer = null;
  longPressTimer = null;
  longPressAdvanceTimer = null;
  bonusHintTimer = null;
  bonusRevealTimer = null;
  bonusCaughtTimer = null;
  bonusCountdownTimer = null;
  dayDrawing = false;
  contextDrag = null;
}

function getProgress(screen) {
  const flowScreens = screensConfig.filter((item) => item.type !== "welcome" && item.type !== "nextStep");
  const index = flowScreens.findIndex((item) => item.id === screen.id);
  return Math.max(5, Math.round(((index + 1) / flowScreens.length) * 100));
}

function getProgressLabel(screen) {
  const flowScreens = screensConfig.filter((item) => item.type !== "welcome" && item.type !== "nextStep");
  const index = flowScreens.findIndex((item) => item.id === screen.id);
  return `Шаг ${index + 1} из ${flowScreens.length}`;
}

function fitCurrentScreen() {
  const content = app.querySelector(".content");
  if (!content) return;

  content.style.transform = "";
  content.style.width = "";

  const availableHeight = content.clientHeight;
  const neededHeight = content.scrollHeight;
  if (!availableHeight || neededHeight <= availableHeight + 8) return;

  const minScale = window.innerWidth < 560 ? 0.92 : 0.88;
  const scale = Math.max(minScale, Math.min(1, availableHeight / neededHeight));
  content.style.transformOrigin = "top left";
  content.style.transform = `scale(${scale})`;
  content.style.width = `${100 / scale}%`;
}

function persistState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // file:// previews may block storage; the flow should still render.
  }
}

function readJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

function removeStoredState(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Storage can be unavailable in direct file previews.
  }
}

function createSessionId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `session_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function getBodyIcon(index) {
  const icons = ["☀", "◐", "↯", "◌", "✦", "⌁"];
  return icons[index % icons.length];
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
