(function () {
  var L = document && document.currentScript && document.currentScript.src;
  (window.webpackJsonpruntime = window.webpackJsonpruntime || []).push([
    [7],
    {
      q6BR: function (N, c, u) {
        "use strict";
        u.r(c),
          u.d(c, "init", function () {
            return y;
          }),
          u.d(c, "clean", function () {
            return C;
          }),
          u.d(c, "onPageChange", function () {
            return O;
          });
        class h {
          constructor({ elementsSelector: e, listener: r, threshold: n }) {
            (this.onIntersection = o => {
              o.forEach(s => {
                s.isIntersecting
                  ? this.currentIntersecting.add(s.target)
                  : this.currentIntersecting.delete(s.target);
              }),
                this.listener(this.currentIntersecting);
            }),
              (this.elementSelector = e),
              (this.listener = r),
              (this.threshold = n),
              (this.observer = new IntersectionObserver(this.onIntersection, {
                threshold: this.threshold,
              })),
              this._init();
          }
          destroy() {
            this.elementsToMonitor.forEach(e => {
              this.observer.unobserve(e);
            });
          }
          _init() {
            (this.elementsToMonitor =
              document.querySelectorAll(this.elementSelector) || []),
              (this.currentIntersecting = new Set([])),
              this.elementsToMonitor.forEach(e => {
                this.observer.observe(e);
              });
          }
          reinit() {
            this.destroy(), this._init();
          }
        }
        h.displayName = "ElementIntersectionObserver";
        function v({
          elementsSelector: t,
          listener: e = () => {},
          threshold: r = 0.2,
        } = {}) {
          return new h({ elementsSelector: t, listener: e, threshold: r });
        }
        const d = ".unifiednav",
          l = "dmNavItemSelected",
          g = "[data-anchor]",
          A = 0.35;
        let a;
        class f {
          constructor() {
            (this.onObserverUpdated = e => {
              this.currentIntersecting = Array.from(e);
            }),
              (this.onScroll = () => {
                if (
                  document.querySelector(".layout-drawer_open") ||
                  !this.currentIntersecting
                )
                  return;
                const e = this.currentIntersecting.filter(r => {
                  const n =
                    document.scrollingElement || document.documentElement;
                  return (r.offsetTop - n.scrollTop) / window.innerHeight < A;
                });
                this.transitioning ||
                  ((this.transitioning = !0),
                  window.requestAnimationFrame(() => {
                    this.navigationWidgets.forEach(r => {
                      (r.querySelectorAll("a") || []).forEach(o => {
                        o.classList.remove(l);
                        const s = o.getAttribute("href");
                        E({ href: s, intersectingElements: e }) && S(o);
                      }),
                        (this.transitioning = !1);
                    }),
                      I(e);
                  }));
              }),
              (this.destroy = () => {
                this.observer.destroy();
              }),
              this._init();
          }
          reInitMarkers() {
            this._init();
          }
          _init() {
            if (!document.querySelectorAll(d)) {
              this.observer && this.observer.destroy(),
                document.removeEventListener("scroll", this.onScroll, {
                  passive: !0,
                });
              return;
            }
            document.removeEventListener("scroll", this.onScroll, {
              passive: !0,
            }),
              document.addEventListener("scroll", this.onScroll, {
                passive: !0,
              }),
              (this.observer = v({
                elementsSelector: g,
                threshold: 0.4,
                listener: this.onObserverUpdated,
              })),
              (this.navigationWidgets =
                Array.from(document.querySelectorAll(d)) || []);
          }
        }
        f.displayName = "AnchorMarker";
        function S(t) {
          t.classList.add(l),
            m(t, []).forEach(r => {
              const n = r.querySelector("a");
              !t || n.classList.add(l);
            });
        }
        function m(t, e) {
          return t.matches("nav")
            ? e
            : (t.matches(".unifiednav__item-wrap") && e.push(t),
              m(t.parentNode, e));
        }
        function E({ intersectingElements: t, href: e }) {
          return (
            t[t.length - 1] &&
            (e == null
              ? void 0
              : e.includes(t[t.length - 1].getAttribute("id")))
          );
        }
        function I(t) {
          t.length ||
            Array.from(document.querySelectorAll(".currentPage") || []).forEach(
              e => {
                e.href.includes("#") || e.classList.add(l);
              }
            );
        }
        function p() {
          return window.rtCommonProps["feature.flag.mark.anchors"]
            ? ((a = new f()), a)
            : null;
        }
        function w() {
          !window.rtCommonProps["feature.flag.mark.anchors"] || a.destroy();
        }
        let i;
        function y() {
          return (i = p()), Promise.resolve();
        }
        function O() {
          i && i.reInitMarkers();
        }
        function C() {
          i && i.clean();
        }
      },
    },
  ]);
})();
