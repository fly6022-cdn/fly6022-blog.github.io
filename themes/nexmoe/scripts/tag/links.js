
/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
const shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

hexo.extend.tag.register(
    'links',
    (args, content) => {
        let items = '';
        let data = [];
        try {
            data = JSON.parse(content);
        } catch (e) {
            return e;
        }
        if (args.includes('shuffle')) {
            console.warn('[Nexmoe] Links tag is using shuffle mode');
            data = shuffle(data);
        }

        let tooltip = '';
        for (let i = 0; i < data.length; i++) {
            tooltip = data[i].nickname
                ? `mdui-tooltip="{content: '${data[i].nickname}'}"`
                : '';
            items
				= items
				+ `
				<li ${tooltip}>
					<a target="_blank" href="${data[i].link}" title="${data[i].nickname}">
						<img src="${data[i].logo}">
					</a>
				</li>`;
        }

        const html = `<div class="nexmoe-py"><ul>${items}</ul></div>`;
        return html;
    },
    { ends: true }
);
