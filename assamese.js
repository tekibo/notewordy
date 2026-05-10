//  copyright lexilogos.com


(function () {
    const textarea = document.getElementById("bar");

    const replacements = [

        //? [/্-/g, "\u200d্"], 

        [/a/g, "অ"],
        [/[Aāâ]/g, "আ"],
        [/i/g, "ই"],
        [/[Iīî]/g, "ঈ"],
        [/u/g, "উ"],
        [/[Uūû]/g, "ঊ"],
        [/অঅ/g, "আ"],
        [/ইই/g, "ঈ"],
        [/উউ/g, "ঊ"],
        [/[eê]/g, "এ"],
        [/[oô]/g, "ও"],
        [/ওই/g, "ঐ"],
        [/E/g, "ঐ"],
        [/ওউ/g, "ঔ"],
        [/O/g, "ঔ"],


        // suppression du virama 
        [/িই/g, "ী"],
        [/ুউ/g, "ূ"],
        [/্ও/g, "\u200b"],
        [/্অ/g, "া"],
        [/\u200bই/g, "ৈ"],
        [/\u200bউ/g, "ৌ"],
        [/\u200bও/g, "ো"],
        [/\u200bঊ/g, "ৗ"], //aU 

        [/্আ/g, "া"],
        [/্ই/g, "ি"],
        [/্ঈ/g, "ী"],
        [/্উ/g, "ু"],
        [/্ঊ/g, "ূ"],

        [/্ঋ/g, "ৃ"],
        [/্ৠ/g, "ৄ"],
        [/্ঌ/g, "ৢ"],
        [/্ৡ/g, " ৣ"],
        [/্এ/g, "ে"],
        //[/্ও/g, "ো"],
        [/্ /g, " "],

        //cons
        [/n/g, "ন্"],
        [/k/g, "ক্"],
        [/g/g, "গ্"],
        [/c/g, "চ্"],
        [/j/g, "জ্"],
        [/[TṭṬ]/g, "ট্"],
        [/[DḍḌ]/g, "ড্"],
        [/[NṇṆ]/g, "ণ্"],
        [/t/g, "ত্"],
        [/ত্-/g, "ৎ"], // t final
        [/d/g, "দ্"],
        [/p/g, "প্"],
        [/b/g, "ব্"],
        [/m/g, "ম্"],
        [/[yY]/g, "য়্"], // un seul y
        [/R/g, "ড়্"],
        [/z/g, "য্"], // z replace y
        [/r/g, "ৰ্"], // autre 
        [/[wv]/g, "ৱ্"], // ajout 
        [/l/g, "ল্"],
        [/h/g, "হ্"],
        [/[SXṣṢ]/g, "ষ্"],
        [/[sx]/g, "স্"],
        // cas particuliers 
        [/K/g, "ক্ষ্"], // ajout k+S 
        [/G/g, "ঙ্"],
        [/J/g, "ঞ্"],
        [/ñ/g, "ঞ্"],
        [/ন্গ্/g, "ঙ্"],
        [/ন্জ্/g, "ঞ্"],

        // aspirées
        [/ক্হ্/g, "খ্"],
        [/গ্হ্/g, "ঘ্"],
        [/চ্হ্/g, "ছ্"],
        [/জ্হ্/g, "ঝ্"],
        [/ট্হ্/g, "ঠ্"],
        [/ড্হ্/g, "ঢ্"],
        [/ত্হ্/g, "থ্"],
        [/দ্হ্/g, "ধ্"],
        [/প্হ্/g, "ফ্"],
        [/ব্হ্/g, "ভ্"],
        [/ড়্হ্/g, "ঢ়্"],


        // cas du s barre
        [/স্হ্/g, "শ্"],
        [/[çśŚ]/g, "শ্"], // pas de z

        // cas du ri li 
        [/্-ৰ/g, "ৃ"],
        [/-ৰ/g, "ঋ"],
        [/ঋই/g, "ৠ"],
        [/ৃই/g, "ৄ"],

        [/্-ল্/g, "ৢ"],
        [/-ল্/g, "ঌ"],
        [/ঌই/g, "ৡ"],
        [/ৢই/g, "ৣ"],

        // ponctuation devanagari
        [/\|/g, "।"],
        [/\//g, "।"],
        [/।।/g, "॥"],

        //suppression du zero
        [/\u200bক/g, "ক"],
        [/\u200bখ/g, "খ"],
        [/\u200bগ/g, "গ"],
        [/\u200bঘ/g, "ঘ"],
        [/\u200bঙ/g, "ঙ"],
        [/\u200bচ/g, "চ"],
        [/\u200bছ/g, "ছ"],
        [/\u200bজ/g, "জ"],
        [/\u200bঝ/g, "ঝ"],
        [/\u200bঞ/g, "ঞ"],
        [/\u200bট/g, "ট"],
        [/\u200bঠ/g, "ঠ"],
        [/\u200bড/g, "ড"],
        [/\u200bঢ/g, "ঢ"],
        [/\u200bণ/g, "ণ"],
        [/\u200bত/g, "ত"],
        [/\u200bথ/g, "থ"],
        [/\u200bদ/g, "দ"],
        [/\u200bধ/g, "ধ"],
        [/\u200bন/g, "ন"],
        [/\u200bপ/g, "প"],
        [/\u200bফ/g, "ফ"],
        [/\u200bব/g, "ব"],
        [/\u200bভ/g, "ভ"],
        [/\u200bম/g, "ম"],
        [/\u200bয/g, "য"],
        [/\u200bর/g, "র"],
        [/\u200bল/g, "ল"],
        [/\u200bশ/g, "শ"],
        [/\u200bষ/g, "ষ"],
        [/\u200bস/g, "স"],
        [/\u200bহ/g, "হ"],
        [/\u200b /g, " "],
        [/\u200b\ং/g, "ং"],
        [/\u200b\ঃ/g, "ঃ"],

        // anusvara
        [/[Mṁ]/g, "ং"],
        [/্ং/g, "ং"],
        // candrabindu 
        [/ংং/g, "ঁ"],
        // visarga
        [/[Hḥ]/g, "ঃ"],
        [/্ঃ/g, "ঃ"],

        // alternative : [/:/g, "ः"],
        // avagraha
        [/\'/g, "ঽ"],
        [/’/g, "ঽ"],

        //half conso
        [/_/g, "\u200d"],
        [/\u200d\u200d/g, "\u200c"],

        [/0/g, "০"],
        [/1/g, "১"],
        [/2/g, "২"],
        [/3/g, "৩"],
        [/4/g, "৪"],
        [/5/g, "৫"],
        [/6/g, "৬"],
        [/7/g, "৭"],
        [/8/g, "৮"],
        [/9/g, "৯"],
    ];

    const transform = (txt) => {
        let result = txt;
        for (const [regex, replacement] of replacements) {
            result = result.replace(regex, replacement);
        }
        return result;
    };

    textarea.addEventListener("input", (e) => {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const scrollTop = textarea.scrollTop;

        const originalText = textarea.value;

        if (start === 0 && end === originalText.length) {
            textarea.value = transform(originalText);
            textarea.selectionStart = 0;
            textarea.selectionEnd = textarea.value.length;
        }
        else {
            textarea.value = transform(originalText);

            let beforeCursorOriginal = originalText.substring(0, start);
            beforeCursorOriginal = transform(beforeCursorOriginal);
            textarea.selectionStart = textarea.selectionEnd = beforeCursorOriginal.length;
        }

        textarea.scrollTop = scrollTop;
    });


    textarea.addEventListener("keydown", (e) => {
        if (e.ctrlKey || e.metaKey) {
            return;
        }
    });

})();