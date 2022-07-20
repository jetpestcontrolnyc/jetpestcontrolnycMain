(function () {
  var $ = document && document.currentScript && document.currentScript.src;
  (window.webpackJsonpruntime = window.webpackJsonpruntime || []).push([
    [22],
    {
      "94Vr": function (ee, q, W) {
        "use strict";
        W.r(q);
        var u = { t: !1, i: !1, o: 15e3 },
          l = window,
          O = l.console,
          k = document,
          c = l.navigator,
          o = l.performance,
          w = function () {
            return c.deviceMemory;
          },
          b = function () {
            return c.hardwareConcurrency;
          },
          T = function () {
            return o && !!o.getEntriesByType && !!o.now && !!o.mark;
          },
          M = "4g",
          x = !1,
          L = function () {
            return !!(b() && b() <= 4) || !!(w() && w() <= 4);
          },
          j = function (t, e) {
            return !!L() || !!["slow-2g", "2g", "3g"].includes(t) || !!e;
          },
          S = { u: !1 },
          V = function (t) {
            k.hidden && (t(), (S.u = k.hidden));
          },
          g = function (t) {
            return parseFloat(t.toFixed(2));
          },
          p = function (t) {
            return typeof t != "number" ? null : g(t / Math.pow(1024, 2));
          },
          z = [1e3, 2500],
          C = [2500, 4e3],
          I = [100, 300],
          P = [0.1, 0.25],
          h = [300, 600],
          E = {
            fp: z,
            fcp: z,
            lcp: C,
            lcpFinal: C,
            fid: I,
            fidVitals: I,
            cls: P,
            clsFinal: P,
            tbt: h,
            tbt5S: h,
            tbt10S: h,
            tbtFinal: h,
          },
          N = function (t, e) {
            return E[t]
              ? e <= E[t][0]
                ? "good"
                : e <= E[t][1]
                ? "needsImprovement"
                : "poor"
              : null;
          },
          R = function (t, e, r) {
            var n;
            (n = function () {
              (S.u && t.indexOf("Final") < 0) ||
                !u.analyticsTracker ||
                u.analyticsTracker({
                  metricName: t,
                  data: e,
                  eventProperties: r || {},
                  navigatorInformation: c
                    ? {
                        deviceMemory: w() || 0,
                        hardwareConcurrency: b() || 0,
                        serviceWorkerStatus:
                          "serviceWorker" in c
                            ? c.serviceWorker.controller
                              ? "controlled"
                              : "supported"
                            : "unsupported",
                        isLowEndDevice: L(),
                        isLowEndExperience: j(M, x),
                      }
                    : {},
                  vitalsScore: N(t, e),
                });
            }),
              "requestIdleCallback" in l
                ? l.requestIdleCallback(n, { timeout: 3e3 })
                : n();
          },
          d = function (t, e, r) {
            Object.keys(e).forEach(function (n) {
              typeof e[n] == "number" && (e[n] = g(e[n]));
            }),
              R(t, e, r);
          },
          a = function (t, e, r) {
            var n = g(t);
            n <= u.o && n >= 0 && R(e, n, r);
          },
          m = {},
          F = { value: 0 },
          B = { value: 0 },
          _ = { value: 0 },
          D = {
            value: {
              beacon: 0,
              css: 0,
              fetch: 0,
              img: 0,
              other: 0,
              script: 0,
              total: 0,
              xmlhttprequest: 0,
            },
          },
          v = { value: 0 },
          J = function (t) {
            var e = t.pop();
            e && !e.s && e.value && (F.value += e.value);
          },
          i = {},
          f = function (t, e) {
            try {
              var r = new PerformanceObserver(function (n) {
                e(n.getEntries());
              });
              return r.observe({ type: t, buffered: !0 }), r;
            } catch (n) {
              O.warn("Perfume.js:", n);
            }
            return null;
          },
          y = function (t) {
            i[t] && i[t].disconnect(), delete i[t];
          },
          A = function (t) {
            var e = t.pop();
            e &&
              (a(e.processingStart - e.startTime, "fidVitals", {
                performanceEntry: e,
              }),
              a(e.duration, "fid", { performanceEntry: e })),
              y(1),
              a(_.value, "lcp"),
              i[3] &&
                typeof i[3].takeRecords == "function" &&
                i[3].takeRecords(),
              a(F.value, "cls"),
              a(v.value, "tbt"),
              setTimeout(function () {
                a(v.value, "tbt5S");
              }, 5e3),
              setTimeout(function () {
                a(v.value, "tbt10S"), d("dataConsumption", D.value);
              }, 1e4);
          },
          G = function (t) {
            t.forEach(function (e) {
              if (!(e.name !== "self" || e.startTime < B.value)) {
                var r = e.duration - 50;
                r > 0 && (v.value += r);
              }
            });
          },
          H = function (t) {
            t.forEach(function (e) {
              e.name === "first-paint"
                ? a(e.startTime, "fp")
                : e.name === "first-contentful-paint" &&
                  ((B.value = e.startTime),
                  a(B.value, "fcp"),
                  (i[4] = f("longtask", G)),
                  y(0));
            });
          },
          K = function (t) {
            var e = t.pop();
            e && (_.value = e.renderTime || e.loadTime);
          },
          Q = function (t) {
            t.forEach(function (e) {
              e.identifier && a(e.startTime, e.identifier);
            });
          },
          U = function (t) {
            t.forEach(function (e) {
              if (
                (u.t && d("resourceTiming", e),
                e.decodedBodySize && e.initiatorType)
              ) {
                var r = e.decodedBodySize / 1e3;
                (D.value[e.initiatorType] += r), (D.value.total += r);
              }
            });
          },
          X = function () {
            i[2] && (a(_.value, "lcpFinal"), y(2)),
              i[3] &&
                (typeof i[3].takeRecords == "function" && i[3].takeRecords(),
                a(F.value, "clsFinal"),
                y(3)),
              i[4] && (a(v.value, "tbtFinal"), y(4));
          },
          Y = function (t) {
            var e = "usageDetails" in t ? t.usageDetails : {};
            d("storageEstimate", {
              quota: p(t.quota),
              usage: p(t.usage),
              caches: p(e.caches),
              indexedDB: p(e.indexedDB),
              serviceWorker: p(e.serviceWorkerRegistrations),
            });
          },
          Z = (function () {
            function t(e) {
              e === void 0 && (e = {}),
                (this.l = "5.3.0"),
                (u.analyticsTracker = e.analyticsTracker),
                (u.t = !!e.resourceTiming),
                (u.i = !!e.elementTiming),
                (u.o = e.maxMeasureTime || u.o),
                T() &&
                  ("PerformanceObserver" in l &&
                    ((i[0] = f("paint", H)),
                    (i[1] = f("first-input", A)),
                    (i[2] = f("largest-contentful-paint", K)),
                    u.t && f("resource", U),
                    (i[3] = f("layout-shift", J)),
                    u.i && f("element", Q)),
                  k.hidden !== void 0 &&
                    k.addEventListener("visibilitychange", V.bind(this, X)),
                  d(
                    "navigationTiming",
                    (function () {
                      if (!T()) return {};
                      var r = o.getEntriesByType("navigation")[0];
                      if (!r) return {};
                      var n = r.responseStart,
                        s = r.responseEnd;
                      return {
                        fetchTime: s - r.fetchStart,
                        workerTime: r.workerStart > 0 ? s - r.workerStart : 0,
                        totalTime: s - r.requestStart,
                        downloadTime: s - n,
                        timeToFirstByte: n - r.requestStart,
                        headerSize: r.transferSize - r.encodedBodySize || 0,
                        dnsLookupTime: r.domainLookupEnd - r.domainLookupStart,
                      };
                    })()
                  ),
                  d(
                    "networkInformation",
                    (function () {
                      if ("connection" in c) {
                        var r = c.connection;
                        return typeof r != "object"
                          ? {}
                          : ((M = r.effectiveType),
                            (x = !!r.saveData),
                            {
                              downlink: r.downlink,
                              effectiveType: r.effectiveType,
                              rtt: r.rtt,
                              saveData: !!r.saveData,
                            });
                      }
                      return {};
                    })()
                  ),
                  c &&
                    c.storage &&
                    typeof c.storage.estimate == "function" &&
                    c.storage.estimate().then(Y));
            }
            return (
              (t.prototype.start = function (e) {
                T() &&
                  !m[e] &&
                  ((m[e] = !0), o.mark("mark_" + e + "_start"), (S.u = !1));
              }),
              (t.prototype.end = function (e, r) {
                r === void 0 && (r = {}),
                  T() &&
                    m[e] &&
                    (o.mark("mark_" + e + "_end"),
                    delete m[e],
                    d(
                      e,
                      g(
                        (function (n) {
                          o.measure(
                            n,
                            "mark_" + n + "_start",
                            "mark_" + n + "_end"
                          );
                          var s = o.getEntriesByName(n).pop();
                          return s && s.entryType === "measure"
                            ? s.duration
                            : -1;
                        })(e)
                      ),
                      r
                    ));
              }),
              (t.prototype.endPaint = function (e, r) {
                var n = this;
                setTimeout(function () {
                  n.end(e, r);
                });
              }),
              (t.prototype.clear = function (e) {
                delete m[e],
                  o.clearMarks &&
                    (o.clearMarks("mark_" + e + "_start"),
                    o.clearMarks("mark_" + e + "_end"));
              }),
              t
            );
          })();
        q.default = Z;
      },
    },
  ]);
})();
