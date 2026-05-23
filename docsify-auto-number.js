/*!
 * docsify-auto-numbering.js
 * ------------------------------------------------------------
 * 一个用于 docsify 文档标题自动编号的插件。
 *
 * 功能说明：
 * - 支持 h1 ~ h6 标题自动编号
 * - 支持从指定标题级别开始编号
 * - 支持排除指定标题级别
 * - 支持中文编号与默认数字编号
 * - 支持编号悬浮显示或始终显示
 * - 支持编号显示在标题上方或标题前方
 * - 自动生成标题 id，避免锚点污染与重复冲突
 *
 * @author  马小战
 * @email   jav1988@qq.com
 * @version 1.0.0
 * @date    2026-05-23
 * @license MIT
 */

(function () {

  function slugify(text) {
    return String(text)
      .trim()
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function createUniqueId(base, usedIds) {
    let id = base || 'section';
    let index = 2;
    let uniqueId = id;

    while (usedIds.has(uniqueId) || document.getElementById(uniqueId)) {
      uniqueId = `${id}-${index}`;
      index++;
    }

    usedIds.add(uniqueId);
    return uniqueId;
  }

  function toChineseNumber(num) {
    const digits = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

    if (num <= 0) return String(num);
    if (num < 10) return digits[num];
    if (num === 10) return '十';

    if (num < 20) {
      return '十' + digits[num % 10];
    }

    if (num < 100) {
      const ten = Math.floor(num / 10);
      const one = num % 10;
      return digits[ten] + '十' + (one ? digits[one] : '');
    }

    return String(num);
  }

  function getHeadingText(heading) {
    const clone = heading.cloneNode(true);

    clone.querySelectorAll('.doc-number').forEach(el => el.remove());
    clone.querySelectorAll('.anchor').forEach(el => el.remove());

    return clone.textContent.trim();
  }

  function formatNumber(counters, level, startLevel, style) {
    const path = counters
      .slice(startLevel - 1, level)
      .filter(num => num > 0);

    if (!path.length) return '';

    if (style === 'cn') {
      if (path.length === 1) {
        return toChineseNumber(path[0]) + '、';
      }

      if (path.length === 2) {
        return path[1] + '、';
      }

      return path.slice(1).join('.') + '.';
    }

    return path.join('.') + '.';
  }

  function createNumberSpan(number, mode, position) {
    const span = document.createElement('span');

    span.classList.add('doc-number');

    if (position === 'top') {
      span.classList.add('doc-number--top');
    } else {
      span.classList.add('doc-number--inline');
    }

    if (mode === 'always') {
      span.classList.add('doc-number--always');
    }

    span.textContent = number;

    return span;
  }

  function createNumbering(options) {
    const maxLevel = options.levels || 6;
    const startLevel = options.startLevel || 2;
    const exclude = options.exclude || [];
    const mode = options.mode || 'hover';
    const style = options.numberingStyle || 'default';
    const position = options.position || 'top';

    return function (hook, vm) {
      hook.doneEach(function () {
        const content = document.querySelector('.markdown-section');
        if (!content) return;

        const counters = [0, 0, 0, 0, 0, 0];
        const usedIds = new Set();

        content.querySelectorAll('[id]').forEach(el => {
          if (el.id) {
            usedIds.add(el.id);
          }
        });

        const headings = content.querySelectorAll('h1,h2,h3,h4,h5,h6');

        headings.forEach(h => {
          const oldNumber = h.querySelector(':scope > .doc-number');
          if (oldNumber) {
            oldNumber.remove();
          }
        });

        headings.forEach(h => {
          const tagName = h.tagName.toLowerCase();
          const level = parseInt(tagName.substring(1), 10);

          if (exclude.includes(tagName)) return;
          if (level < startLevel || level > maxLevel) return;

          for (let i = level; i < counters.length; i++) {
            counters[i] = 0;
          }

          counters[level - 1]++;

          const rawText = getHeadingText(h);

          if (!h.id) {
            const baseId = slugify(rawText);
            h.id = createUniqueId(baseId, usedIds);
          }

          const number = formatNumber(counters, level, startLevel, style);
          const numberSpan = createNumberSpan(number, mode, position);

          h.insertBefore(numberSpan, h.firstChild);
        });
      });
    };
  }

  window.$docsify = window.$docsify || {};

  const userConfig = window.$docsify.autoNumbering || {};
  const plugin = createNumbering(userConfig);

  window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins || []);

})();