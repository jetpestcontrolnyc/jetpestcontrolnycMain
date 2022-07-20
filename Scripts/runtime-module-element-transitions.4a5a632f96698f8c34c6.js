(function () {
  var p = document && document.currentScript && document.currentScript.src;
  (window.webpackJsonpruntime = window.webpackJsonpruntime || []).push([
    [8],
    {
      db0D: function (f, r, o) {
        "use strict";
        o.r(r),
          o.d(r, "init", function () {
            return m;
          });
        const a = "[data-transition-to]",
          u = "data-transition-to",
          l = "data-transition-to-direction";
        class s {
          constructor() {
            (this.transitioning = !1),
              (this.onScroll = () => {
                !this.currentInterSectingElements.length ||
                  this.transitioning ||
                  ((this.transitioning = !0),
                  window.requestAnimationFrame(this.animation));
              }),
              (this.animation = () => {
                this.transitioning = !1;
                const n = (
                  document.scrollingElement || document.documentElement
                ).scrollTop;
                this.currentInterSectingElements.forEach(t => {
                  const e = this.elementsLocation[t];
                  if (e.top > n + window.innerHeight || e.top < n) return;
                  const c = parseInt(t.getAttribute(u), 10);
                  let i = parseInt(t.getAttribute(l), 10);
                  isNaN(i) && (i = 1);
                  const d = Math.min(
                      1 - Math.abs(e.top - n) / window.innerHeight,
                      1
                    ),
                    g = Math.min(d * c, c);
                  t.style.transform = `translateX(${i * g}px)`;
                });
              }),
              (this.elements = Array.from(document.querySelectorAll(a)) || []),
              (this.elementsLocation = {}),
              (this.currentInterSectingElements = Array.from(this.elements)),
              this.currentInterSectingElements.reduce((n, t) => {
                const e = t.getBoundingClientRect();
                return (n[t] = { top: e.top, height: e.height }), n;
              }, this.elementsLocation),
              document.addEventListener("scroll", this.onScroll, {
                passive: !0,
              });
          }
        }
        s.displayName = "ElementTransition";
        function h() {
          return new s();
        }
        function m() {
          return h(), Promise.resolve();
        }
      },
    },
  ]);
})();
