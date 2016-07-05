function Lorem() {
    var langs = {
        en: {
            common: ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipisicing', 'elit'],
            words: ['exercitationem', 'perferendis', 'perspiciatis', 'laborum', 'eveniet',
                'sunt', 'iure', 'nam', 'nobis', 'eum', 'cum', 'officiis', 'excepturi',
                'odio', 'consectetur', 'quasi', 'aut', 'quisquam', 'vel', 'eligendi',
                'itaque', 'non', 'odit', 'tempore', 'quaerat', 'dignissimos',
                'facilis', 'neque', 'nihil', 'expedita', 'vitae', 'vero', 'ipsum',
                'nisi', 'animi', 'cumque', 'pariatur', 'velit', 'modi', 'natus',
                'iusto', 'eaque', 'sequi', 'illo', 'sed', 'ex', 'et', 'voluptatibus',
                'tempora', 'veritatis', 'ratione', 'assumenda', 'incidunt', 'nostrum',
                'placeat', 'aliquid', 'fuga', 'provident', 'praesentium', 'rem',
                'necessitatibus', 'suscipit', 'adipisci', 'quidem', 'possimus',
                'voluptas', 'debitis', 'sint', 'accusantium', 'unde', 'sapiente',
                'voluptate', 'qui', 'aspernatur', 'laudantium', 'soluta', 'amet',
                'quo', 'aliquam', 'saepe', 'culpa', 'libero', 'ipsa', 'dicta',
                'reiciendis', 'nesciunt', 'doloribus', 'autem', 'impedit', 'minima',
                'maiores', 'repudiandae', 'ipsam', 'obcaecati', 'ullam', 'enim',
                'totam', 'delectus', 'ducimus', 'quis', 'voluptates', 'dolores',
                'molestiae', 'harum', 'dolorem', 'quia', 'voluptatem', 'molestias',
                'magni', 'distinctio', 'omnis', 'illum', 'dolorum', 'voluptatum', 'ea',
                'quas', 'quam', 'corporis', 'quae', 'blanditiis', 'atque', 'deserunt',
                'laboriosam', 'earum', 'consequuntur', 'hic', 'cupiditate',
                'quibusdam', 'accusamus', 'ut', 'rerum', 'error', 'minus', 'eius',
                'ab', 'ad', 'nemo', 'fugit', 'officia', 'at', 'in', 'id', 'quos',
                'reprehenderit', 'numquam', 'iste', 'fugiat', 'sit', 'inventore',
                'beatae', 'repellendus', 'magnam', 'recusandae', 'quod', 'explicabo',
                'doloremque', 'aperiam', 'consequatur', 'asperiores', 'commodi',
                'optio', 'dolor', 'labore', 'temporibus', 'repellat', 'veniam',
                'architecto', 'est', 'esse', 'mollitia', 'nulla', 'a', 'similique',
                'eos', 'alias', 'dolore', 'tenetur', 'deleniti', 'porro', 'facere',
                'maxime', 'corrupti']
        },
        sp: {
            common: ['mujer', 'uno', 'dolor', 'más', 'de', 'poder', 'mismo', 'si'],
            words: ['ejercicio', 'preferencia', 'perspicacia', 'laboral', 'paño',
                'suntuoso', 'molde', 'namibia', 'planeador', 'mirar', 'demás', 'oficinista', 'excepción',
                'odio', 'consecuencia', 'casi', 'auto', 'chicharra', 'velo', 'elixir',
                'ataque', 'no', 'odio', 'temporal', 'cuórum', 'dignísimo',
                'facilismo', 'letra', 'nihilista', 'expedición', 'alma', 'alveolar', 'aparte',
                'león', 'animal', 'como', 'paria', 'belleza', 'modo', 'natividad',
                'justo', 'ataque', 'séquito', 'pillo', 'sed', 'ex', 'y', 'voluminoso',
                'temporalidad', 'verdades', 'racional', 'asunción', 'incidente', 'marejada',
                'placenta', 'amanecer', 'fuga', 'previsor', 'presentación', 'lejos',
                'necesariamente', 'sospechoso', 'adiposidad', 'quindío', 'pócima',
                'voluble', 'débito', 'sintió', 'accesorio', 'falda', 'sapiencia',
                'volutas', 'queso', 'permacultura', 'laudo', 'soluciones', 'entero',
                'pan', 'litro', 'tonelada', 'culpa', 'libertario', 'mosca', 'dictado',
                'reincidente', 'nascimiento', 'dolor', 'escolar', 'impedimento', 'mínima',
                'mayores', 'repugnante', 'dulce', 'obcecado', 'montaña', 'enigma',
                'total', 'deletéreo', 'décima', 'cábala', 'fotografía', 'dolores',
                'molesto', 'olvido', 'paciencia', 'resiliencia', 'voluntad', 'molestias',
                'magnífico', 'distinción', 'ovni', 'marejada', 'cerro', 'torre', 'y',
                'abogada', 'manantial', 'corporal', 'agua', 'crepúsculo', 'ataque', 'desierto',
                'laboriosamente', 'angustia', 'afortunado', 'alma', 'encefalograma',
                'materialidad', 'cosas', 'o', 'renuncia', 'error', 'menos', 'conejo',
                'abadía', 'analfabeto', 'remo', 'fugacidad', 'oficio', 'en', 'almácigo', 'vos', 'pan',
                'represión', 'números', 'triste', 'refugiado', 'trote', 'inventor',
                'corchea', 'repelente', 'magma', 'recusado', 'patrón', 'explícito',
                'paloma', 'síndrome', 'inmune', 'autoinmune', 'comodidad',
                'ley', 'vietnamita', 'demonio', 'tasmania', 'repeler', 'apéndice',
                'arquitecto', 'columna', 'yugo', 'computador', 'mula', 'a', 'propósito',
                'fantasía', 'alias', 'rayo', 'tenedor', 'deleznable', 'ventana', 'cara',
                'anemia', 'corrupto']
        },
        ru: {
            common: ['далеко-далеко', 'за', 'словесными', 'горами', 'в стране', 'гласных', 'и согласных', 'живут', 'рыбные', 'тексты'],
            words: ['вдали', 'от всех', 'они', 'буквенных', 'домах', 'на берегу', 'семантика',
                'большого', 'языкового', 'океана', 'маленький', 'ручеек', 'даль',
                'журчит', 'по всей', 'обеспечивает', 'ее','всеми', 'необходимыми',
                'правилами', 'эта', 'парадигматическая', 'страна', 'которой', 'жаренные',
                'предложения', 'залетают', 'прямо', 'рот', 'даже', 'всемогущая',
                'пунктуация', 'не', 'имеет', 'власти', 'над', 'рыбными', 'текстами',
                'ведущими', 'безорфографичный', 'образ', 'жизни', 'однажды', 'одна',
                'маленькая', 'строчка','рыбного', 'текста', 'имени', 'lorem', 'ipsum',
                'решила', 'выйти', 'большой', 'мир', 'грамматики', 'великий', 'оксмокс',
                'предупреждал', 'о', 'злых', 'запятых', 'диких', 'знаках', 'вопроса',
                'коварных', 'точках', 'запятой', 'но', 'текст', 'дал', 'сбить',
                'себя', 'толку', 'он', 'собрал', 'семь', 'своих', 'заглавных', 'букв',
                'подпоясал', 'инициал', 'за', 'пояс', 'пустился', 'дорогу',
                'взобравшись', 'первую', 'вершину', 'курсивных', 'гор', 'бросил',
                'последний', 'взгляд', 'назад', 'силуэт', 'своего', 'родного', 'города',
                'буквоград', 'заголовок', 'деревни', 'алфавит', 'подзаголовок', 'своего',
                'переулка', 'грустный', 'реторический', 'вопрос', 'скатился', 'его',
                'щеке', 'продолжил', 'свой', 'путь', 'дороге', 'встретил', 'рукопись',
                'она', 'предупредила',  'моей', 'все', 'переписывается', 'несколько',
                'раз', 'единственное', 'что', 'меня', 'осталось', 'это', 'приставка',
                'возвращайся', 'ты', 'лучше', 'свою', 'безопасную', 'страну', 'послушавшись',
                'рукописи', 'наш', 'продолжил', 'свой', 'путь', 'вскоре', 'ему',
                'повстречался', 'коварный', 'составитель', 'рекламных', 'текстов',
                'напоивший', 'языком', 'речью', 'заманивший', 'свое', 'агенство',
                'которое', 'использовало', 'снова', 'снова', 'своих', 'проектах',
                'если', 'переписали', 'то', 'живет', 'там', 'до', 'сих', 'пор']
        }
    };

    const defaultLang = 'en';
    const ommitCommonPart = 'false';
    const min = Math.min.bind(Math);

    function rand(from, to) {
        return ~~(Math.random()*(to-from)) + from;
    }
    
    function sample(array, count) {
        array = Array.from(array);
        var result = [];
        while (count--){
            let i = rand(0,array.length-1);
            result.push(array[i]);
            array.splice(i,1);
        }
        return result;
    }

    function isBtween(number, from, to ) {
        return number >= from && number < to;
    }

    function insertCommas(words) {
        var len = words.length;
        var totalCommas =
                isBtween(0,2)? 0 :
                    isBtween(len, 3, 6)?  rand(0,1):
                        isBtween(len, 6, 12)? rand(0,2):
                            rand(1,4);

        let pos = 0;
        while (totalCommas--){
            pos = rand(pos+2,words-2);
            words.splice(pos,0,',');
        }
    }

    function charChoice(str){
        return str.charAt(rand(0, str.length - 1));
    }

    function sentence( words, end ) {
        if (words.length == 0) return  (end || charChoice('?!...'));
        words[0] = words[0] = words[0].charAt(0).toUpperCase() + words[0].substring(1);
        return words.join(' ') + (end || charChoice('?!...')); // more dots than question marks
    }
    
    function paragraph(lang, wordCount, startWithCommon) {
        var data = langs[lang];
        if( !data ) return '';

        var words = [];
        var results = [];

        if(startWithCommon && data.common){
            words = data.common.slice(0,wordCount);
            if(words.length > 5) words.splice(4,0,',');
            wordCount -= words.length;
            results.push( sentence(words, '.') )
        }

        while( wordCount > 0){
            words = sample(data.words, min( rand(2,30), wordCount ));
            wordCount -= words.length;
            insertCommas(words);
            results.push( sentence(words) )
        }

        return results.join(' ');
        

    }
    
    return {
        addLang: function(lang, data) {
            if (typeof data === 'string') {
                data = {
                    words: data.split(' ').filter(function(item) {
                        return !!item;
                    })
                };
            } else if (Array.isArray(data)) {
                data = {words: data};
            }

            langs[lang] = data;
        },
        paragraph:paragraph
    }


}