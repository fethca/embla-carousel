!(function (n, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t(require('react')))
    : 'function' == typeof define && define.amd
    ? define(['react'], t)
    : ((n = 'undefined' != typeof globalThis ? globalThis : n || self)[
        '@fethcat/emblaCarouselReact'
      ] = t(n.React))
})(this, function (n) {
  'use strict'
  function t(n) {
    return 'number' == typeof n
  }
  function e(n) {
    return 'string' == typeof n
  }
  function r(n) {
    return 'boolean' == typeof n
  }
  function o(n) {
    return '[object Object]' === Object.prototype.toString.call(n)
  }
  function i(n) {
    return Math.abs(n)
  }
  function c(n) {
    return Math.sign(n)
  }
  function u(n, t) {
    return i(n - t)
  }
  function s(n) {
    return p(n).map(Number)
  }
  function a(n) {
    return n[f(n)]
  }
  function f(n) {
    return Math.max(0, n.length - 1)
  }
  function d(n, t) {
    return t === f(n)
  }
  function l(n, t = 0) {
    return Array.from(Array(n), (n, e) => t + e)
  }
  function p(n) {
    return Object.keys(n)
  }
  function g(n, t) {
    return [n, t].reduce(
      (n, t) => (
        p(t).forEach((e) => {
          const r = n[e],
            i = t[e],
            c = o(r) && o(i)
          n[e] = c ? g(r, i) : i
        }),
        n
      ),
      {}
    )
  }
  function m(n, t) {
    return void 0 !== t.MouseEvent && n instanceof t.MouseEvent
  }
  function h() {
    let n = []
    const t = {
      add: function (e, r, o, i = { passive: !0 }) {
        let c
        if ('addEventListener' in e)
          e.addEventListener(r, o, i),
            (c = () => e.removeEventListener(r, o, i))
        else {
          const n = e
          n.addListener(o), (c = () => n.removeListener(o))
        }
        return n.push(c), t
      },
      clear: function () {
        n = n.filter((n) => n())
      }
    }
    return t
  }
  function y(n, t, e, r) {
    const o = h(),
      c = 1e3 / 60
    let u = null,
      s = 0,
      a = 0
    function f(n) {
      if (!a) return
      u || (u = n)
      const o = n - u
      for (u = n, s += o; s >= c; ) e(), (s -= c)
      const d = i(s / c)
      r(d), a && t.requestAnimationFrame(f)
    }
    function d() {
      t.cancelAnimationFrame(a), (u = null), (s = 0), (a = 0)
    }
    return {
      init: function () {
        o.add(n, 'visibilitychange', () => {
          n.hidden && ((u = null), (s = 0))
        })
      },
      destroy: function () {
        d(), o.clear()
      },
      start: function () {
        a || (a = t.requestAnimationFrame(f))
      },
      stop: d,
      update: e,
      render: r
    }
  }
  function x(n = 0, t = 0) {
    const e = i(n - t)
    function r(t) {
      return t < n
    }
    function o(n) {
      return n > t
    }
    function c(n) {
      return r(n) || o(n)
    }
    return {
      length: e,
      max: t,
      min: n,
      constrain: function (e) {
        return c(e) ? (r(e) ? n : t) : e
      },
      reachedAny: c,
      reachedMax: o,
      reachedMin: r,
      removeOffset: function (n) {
        return e ? n - e * Math.ceil((n - t) / e) : n
      }
    }
  }
  function b(n, t, e) {
    const { constrain: r } = x(0, n),
      o = n + 1
    let c = u(t)
    function u(n) {
      return e ? i((o + n) % o) : r(n)
    }
    function s() {
      return c
    }
    function a() {
      return b(n, s(), e)
    }
    const f = {
      get: s,
      set: function (n) {
        return (c = u(n)), f
      },
      add: function (n) {
        return a().set(s() + n)
      },
      clone: a
    }
    return f
  }
  function v(n, t, e, o, s, a, f, d, l, p, g, y, b, v, S, w, E, O, L) {
    const { cross: D, direction: I } = n,
      A = ['INPUT', 'SELECT', 'TEXTAREA'],
      M = { passive: !1 },
      T = h(),
      k = h(),
      F = x(50, 225).constrain(v.measure(20)),
      P = { mouse: 300, touch: 400 },
      z = { mouse: 500, touch: 600 },
      H = S ? 43 : 25
    let j = !1,
      R = 0,
      V = 0,
      N = !1,
      B = !1,
      C = !1,
      q = !1
    function G(n) {
      if (!m(n, o) && n.touches.length >= 2) return $(n)
      const t = a.readPoint(n),
        e = a.readPoint(n, D),
        r = u(t, R),
        i = u(e, V)
      if (!B && !q) {
        if (!n.cancelable) return $(n)
        if (((B = r > i), !B)) return $(n)
      }
      const c = a.pointerMove(n)
      r > w && (C = !0),
        p.useFriction(0.3).useDuration(1),
        d.start(),
        s.add(I(c)),
        n.preventDefault()
    }
    function $(n) {
      const t = g.byDistance(0, !1).index !== y.get(),
        e = a.pointerUp(n) * (S ? z : P)[q ? 'mouse' : 'touch'],
        r = (function (n, t) {
          const e = y.add(-1 * c(n)),
            r = g.byDistance(n, !S).distance
          return S || i(n) < F
            ? r
            : E && t
            ? 0.5 * r
            : g.byIndex(e.get(), 0).distance
        })(I(e), t),
        o = (function (n, t) {
          if (0 === n || 0 === t) return 0
          if (i(n) <= i(t)) return 0
          const e = u(i(n), i(t))
          return i(e / n)
        })(e, r),
        s = H - 10 * o,
        f = O + o / 50
      ;(B = !1),
        (N = !1),
        k.clear(),
        p.useDuration(s).useFriction(f),
        l.distance(r, !S),
        (q = !1),
        b.emit('pointerUp')
    }
    function U(n) {
      C && (n.stopPropagation(), n.preventDefault(), (C = !1))
    }
    return {
      init: function (n) {
        if (!L) return
        function i(i) {
          ;(r(L) || L(n, i)) &&
            (function (n) {
              const r = m(n, o)
              if (
                ((q = r),
                (C = S && r && !n.buttons && j),
                (j = u(s.get(), f.get()) >= 2),
                r && 0 !== n.button)
              )
                return
              if (
                (function (n) {
                  const t = n.nodeName || ''
                  return A.includes(t)
                })(n.target)
              )
                return
              ;(N = !0),
                a.pointerDown(n),
                p.useFriction(0).useDuration(0),
                s.set(f),
                (function () {
                  const n = q ? e : t
                  k.add(n, 'touchmove', G, M)
                    .add(n, 'touchend', $)
                    .add(n, 'mousemove', G, M)
                    .add(n, 'mouseup', $)
                })(),
                (R = a.readPoint(n)),
                (V = a.readPoint(n, D)),
                b.emit('pointerDown')
            })(i)
        }
        const c = t
        T.add(c, 'dragstart', (n) => n.preventDefault(), M)
          .add(c, 'touchmove', () => {}, M)
          .add(c, 'touchend', () => {})
          .add(c, 'touchstart', i)
          .add(c, 'mousedown', i)
          .add(c, 'touchcancel', $)
          .add(c, 'contextmenu', $)
          .add(c, 'click', U, !0)
      },
      pointerDown: function () {
        return N
      },
      destroy: function () {
        T.clear(), k.clear()
      }
    }
  }
  function S(n, t) {
    let e, r
    function o(n) {
      return n.timeStamp
    }
    function c(e, r) {
      const o = 'client' + ('x' === (r || n.scroll) ? 'X' : 'Y')
      return (m(e, t) ? e : e.touches[0])[o]
    }
    return {
      pointerDown: function (n) {
        return (e = n), (r = n), c(n)
      },
      pointerMove: function (n) {
        const t = c(n) - c(r),
          i = o(n) - o(e) > 170
        return (r = n), i && (e = n), t
      },
      pointerUp: function (n) {
        if (!e || !r) return 0
        const t = c(r) - c(e),
          u = o(n) - o(e),
          s = o(n) - o(r) > 170,
          a = t / u
        return u && !s && i(a) > 0.1 ? a : 0
      },
      readPoint: c
    }
  }
  function w(n, t, e, o, c, u, s) {
    let a,
      f,
      d = [],
      l = !1
    function p(n) {
      return c.measureSize(s.measure(n))
    }
    return {
      init: function (c) {
        if (!u) return
        ;(f = p(n)),
          (d = o.map(p)),
          (a = new ResizeObserver((s) => {
            l ||
              ((r(u) || u(c, s)) &&
                (function (r) {
                  for (const u of r) {
                    const r = u.target === n,
                      s = o.indexOf(u.target),
                      a = r ? f : d[s]
                    if (i(p(r ? n : o[s]) - a) >= 0.5) {
                      e.requestAnimationFrame(() => {
                        c.reInit(), t.emit('resize')
                      })
                      break
                    }
                  }
                })(s))
          })),
          [n].concat(o).forEach((n) => a.observe(n))
      },
      destroy: function () {
        a && a.disconnect(), (l = !0)
      }
    }
  }
  function E(n, t, e, r, o) {
    const c = o.measure(10),
      u = o.measure(50),
      s = x(0.1, 0.99)
    let a = !1
    return {
      constrain: function (o) {
        if (a || !n.reachedAny(e.get()) || !n.reachedAny(t.get())) return
        const f = n.reachedMin(t.get()) ? 'min' : 'max',
          d = i(n[f] - t.get()),
          l = e.get() - t.get(),
          p = s.constrain(d / u)
        e.subtract(l * p),
          !o &&
            i(l) < c &&
            (e.set(n.constrain(e.get())), r.useDuration(25).useBaseFriction())
      },
      toggleActive: function (n) {
        a = !n
      }
    }
  }
  function O(n, t, e, r) {
    const o = t.min + 0.1,
      i = t.max + 0.1,
      { reachedMin: c, reachedMax: u } = x(o, i)
    return {
      loop: function (t) {
        if (
          !(function (n) {
            return 1 === n ? u(e.get()) : -1 === n && c(e.get())
          })(t)
        )
          return
        const o = n * (-1 * t)
        r.forEach((n) => n.add(o))
      }
    }
  }
  function L(n, t, e, r, o) {
    const { reachedAny: u, removeOffset: s, constrain: f } = r
    function d(n) {
      return n.concat().sort((n, t) => i(n) - i(t))[0]
    }
    function l(t, r) {
      const o = [t, t + e, t - e]
      if (!n) return o[0]
      if (!r) return d(o)
      const i = o.filter((n) => c(n) === r)
      return i.length ? d(i) : a(o) - e
    }
    return {
      byDistance: function (e, r) {
        const c = o.get() + e,
          { index: a, distance: d } = (function (e) {
            const r = n ? s(e) : f(e),
              o = t
                .map((n, t) => ({ diff: l(n - r, 0), index: t }))
                .sort((n, t) => i(n.diff) - i(t.diff)),
              { index: c } = o[0]
            return { index: c, distance: r }
          })(c),
          p = !n && u(c)
        return !r || p
          ? { index: a, distance: e }
          : { index: a, distance: e + l(t[a] - d, 0) }
      },
      byIndex: function (n, e) {
        return { index: n, distance: l(t[n] - o.get(), e) }
      },
      shortcut: l
    }
  }
  function D(n) {
    let e = n
    function r(n) {
      return t(n) ? n : n.get()
    }
    return {
      get: function () {
        return e
      },
      set: function (n) {
        e = r(n)
      },
      add: function (n) {
        e += r(n)
      },
      subtract: function (n) {
        e -= r(n)
      }
    }
  }
  function I(n, t) {
    const e =
        'x' === n.scroll
          ? function (n) {
              return `translate3d(${n}px,0px,0px)`
            }
          : function (n) {
              return `translate3d(0px,${n}px,0px)`
            },
      r = t.style
    let o = !1
    return {
      clear: function () {
        o ||
          ((r.transform = ''),
          t.getAttribute('style') || t.removeAttribute('style'))
      },
      to: function (t) {
        o || (r.transform = e(n.direction(t)))
      },
      toggleActive: function (n) {
        o = !n
      }
    }
  }
  function A(n, t, e, r, o, i, c, u, a) {
    const f = 0.5,
      d = s(o),
      l = s(o).reverse(),
      p = (function () {
        const n = c[0]
        return h(m(l, n), e, !1)
      })().concat(
        (function () {
          const n = t - c[0] - 1
          return h(m(d, n), -e, !0)
        })()
      )
    function g(n, t) {
      return n.reduce((n, t) => n - o[t], t)
    }
    function m(n, t) {
      return n.reduce((n, e) => (g(n, t) > 0 ? n.concat([e]) : n), [])
    }
    function h(o, c, s) {
      const d = (function (n) {
        return i.map((e, o) => ({
          start: e - r[o] + f + n,
          end: e + t - f + n
        }))
      })(c)
      return o.map((t) => {
        const r = s ? 0 : -e,
          o = s ? e : 0,
          i = s ? 'end' : 'start',
          c = d[t][i]
        return {
          index: t,
          loopPoint: c,
          slideLocation: D(-1),
          translate: I(n, a[t]),
          target: () => (u.get() > c ? r : o)
        }
      })
    }
    return {
      canLoop: function () {
        return p.every(
          ({ index: n }) =>
            g(
              d.filter((t) => t !== n),
              t
            ) <= 0.1
        )
      },
      clear: function () {
        p.forEach((n) => n.translate.clear())
      },
      loop: function () {
        p.forEach((n) => {
          const { target: t, translate: e, slideLocation: r } = n,
            o = t()
          o !== r.get() && (e.to(o), r.set(o))
        })
      },
      loopPoints: p
    }
  }
  function M(n, t, e) {
    let o,
      i = !1
    return {
      init: function (c) {
        e &&
          ((o = new MutationObserver((n) => {
            i ||
              ((r(e) || e(c, n)) &&
                (function (n) {
                  for (const e of n)
                    if ('childList' === e.type) {
                      c.reInit(), t.emit('slidesChanged')
                      break
                    }
                })(n))
          })),
          o.observe(n, { childList: !0 }))
      },
      destroy: function () {
        o && o.disconnect(), (i = !0)
      }
    }
  }
  function T(n, t, e, r) {
    const o = {}
    let i,
      c = null,
      u = null,
      s = !1
    return {
      init: function () {
        ;(i = new IntersectionObserver(
          (n) => {
            s ||
              (n.forEach((n) => {
                const e = t.indexOf(n.target)
                o[e] = n
              }),
              (c = null),
              (u = null),
              e.emit('slidesInView'))
          },
          { root: n.parentElement, threshold: r }
        )),
          t.forEach((n) => i.observe(n))
      },
      destroy: function () {
        i && i.disconnect(), (s = !0)
      },
      get: function (n = !0) {
        if (n && c) return c
        if (!n && u) return u
        const t = (function (n) {
          return p(o).reduce((t, e) => {
            const r = parseInt(e),
              { isIntersecting: i } = o[r]
            return ((n && i) || (!n && !i)) && t.push(r), t
          }, [])
        })(n)
        return n && (c = t), n || (u = t), t
      }
    }
  }
  function k(n, e, r, o, c, u, d, l, p) {
    const { startEdge: g, endEdge: m, direction: h } = n,
      y = t(r)
    return {
      groupSlides: function (n) {
        return y
          ? (function (n, t) {
              return s(n)
                .filter((n) => n % t == 0)
                .map((e) => n.slice(e, e + t))
            })(n, r)
          : (function (n) {
              return n.length
                ? s(n)
                    .reduce((t, r, s) => {
                      const y = a(t) || 0,
                        x = 0 === y,
                        b = r === f(n),
                        v = c[g] - u[y][g],
                        S = c[g] - u[r][m],
                        w = !o && x ? h(d) : 0,
                        E = i(S - (!o && b ? h(l) : 0) - (v + w))
                      return (
                        s && E > e + p && t.push(r), b && t.push(n.length), t
                      )
                    }, [])
                    .map((t, e, r) => {
                      const o = Math.max(r[e - 1] || 0)
                      return n.slice(o, t)
                    })
                : []
            })(n)
      }
    }
  }
  function F(n, r, o, p, g, m, F) {
    const {
        align: P,
        axis: z,
        direction: H,
        startIndex: j,
        loop: R,
        duration: V,
        dragFree: N,
        dragThreshold: B,
        inViewThreshold: C,
        slidesToScroll: q,
        skipSnaps: G,
        containScroll: $,
        watchResize: U,
        watchSlides: W,
        watchDrag: J
      } = m,
      Q = {
        measure: function (n) {
          const {
            offsetTop: t,
            offsetLeft: e,
            offsetWidth: r,
            offsetHeight: o
          } = n
          return {
            top: t,
            right: e + r,
            bottom: t + o,
            left: e,
            width: r,
            height: o
          }
        }
      },
      X = Q.measure(r),
      Y = o.map(Q.measure),
      K = (function (n, t) {
        const e = 'rtl' === t,
          r = 'y' === n,
          o = !r && e ? -1 : 1
        return {
          scroll: r ? 'y' : 'x',
          cross: r ? 'x' : 'y',
          startEdge: r ? 'top' : e ? 'right' : 'left',
          endEdge: r ? 'bottom' : e ? 'left' : 'right',
          measureSize: function (n) {
            const { height: t, width: e } = n
            return r ? t : e
          },
          direction: function (n) {
            return n * o
          }
        }
      })(z, H),
      Z = K.measureSize(X),
      _ = (function (n) {
        return {
          measure: function (t) {
            return n * (t / 100)
          }
        }
      })(Z),
      nn = (function (n, t) {
        const r = {
          start: function () {
            return 0
          },
          center: function (n) {
            return o(n) / 2
          },
          end: o
        }
        function o(n) {
          return t - n
        }
        return {
          measure: function (o, i) {
            return e(n) ? r[n](o) : n(t, o, i)
          }
        }
      })(P, Z),
      tn = !R && !!$,
      en = R || !!$,
      {
        slideSizes: rn,
        slideSizesWithGaps: on,
        startGap: cn,
        endGap: un
      } = (function (n, t, e, r, o, c) {
        const { measureSize: u, startEdge: s, endEdge: f } = n,
          l = e[0] && o,
          p = (function () {
            if (!l) return 0
            const n = e[0]
            return i(t[s] - n[s])
          })(),
          g = (function () {
            if (!l) return 0
            const n = c.getComputedStyle(a(r))
            return parseFloat(n.getPropertyValue(`margin-${f}`))
          })(),
          m = e.map(u),
          h = e
            .map((n, t, e) => {
              const r = !t,
                o = d(e, t)
              return r ? m[t] + p : o ? m[t] + g : e[t + 1][s] - n[s]
            })
            .map(i)
        return { slideSizes: m, slideSizesWithGaps: h, startGap: p, endGap: g }
      })(K, X, Y, o, en, g),
      sn = k(K, Z, q, R, X, Y, cn, un, 2),
      { snaps: an, snapsAligned: fn } = (function (n, t, e, r, o) {
        const { startEdge: c, endEdge: u } = n,
          { groupSlides: s } = o,
          f = s(r)
            .map((n) => a(n)[u] - n[0][c])
            .map(i)
            .map(t.measure),
          d = r.map((n) => e[c] - n[c]).map((n) => -i(n)),
          l = s(d)
            .map((n) => n[0])
            .map((n, t) => n + f[t])
        return { snaps: d, snapsAligned: l }
      })(K, nn, X, Y, sn),
      dn = -a(an) + a(on),
      { snapsContained: ln, scrollContainLimit: pn } = (function (
        n,
        t,
        e,
        r,
        o
      ) {
        const i = x(-t + n, 0),
          c = e
            .map((n, t) => {
              const { min: r, max: o } = i,
                c = i.constrain(n),
                u = !t,
                s = d(e, t)
              return u ? o : s || f(r, c) ? r : f(o, c) ? o : c
            })
            .map((n) => parseFloat(n.toFixed(3))),
          s = (function () {
            const n = c[0],
              t = a(c)
            return x(c.lastIndexOf(n), c.indexOf(t) + 1)
          })()
        function f(n, t) {
          return u(n, t) < 1
        }
        return {
          snapsContained: (function () {
            if (t <= n + o) return [i.max]
            if ('keepSnaps' === r) return c
            const { min: e, max: u } = s
            return c.slice(e, u)
          })(),
          scrollContainLimit: s
        }
      })(Z, dn, fn, $, 2),
      gn = tn ? ln : fn,
      { limit: mn } = (function (n, t, e) {
        const r = t[0]
        return { limit: x(e ? r - n : a(t), r) }
      })(dn, gn, R),
      hn = b(f(gn), j, R),
      yn = hn.clone(),
      xn = s(o),
      bn = y(
        p,
        g,
        () =>
          (({
            dragHandler: n,
            scrollBody: t,
            scrollBounds: e,
            options: { loop: r }
          }) => {
            r || e.constrain(n.pointerDown()), t.seek()
          })(Fn),
        (n) =>
          ((
            {
              scrollBody: n,
              translate: t,
              location: e,
              offsetLocation: r,
              scrollLooper: o,
              slideLooper: i,
              dragHandler: c,
              animation: u,
              eventHandler: s,
              options: { loop: a }
            },
            f
          ) => {
            const d = n.velocity(),
              l = n.settled()
            l && !c.pointerDown() && (u.stop(), s.emit('settle')),
              l || s.emit('scroll'),
              r.set(e.get() - d + d * f),
              a && (o.loop(n.direction()), i.loop()),
              t.to(r.get())
          })(Fn, n)
      ),
      vn = gn[hn.get()],
      Sn = D(vn),
      wn = D(vn),
      En = D(vn),
      On = (function (n, t, e, r, o) {
        let u = 0,
          s = 0,
          a = r,
          f = o,
          d = n.get(),
          l = 0
        function p(n) {
          return (a = n), m
        }
        function g(n) {
          return (f = n), m
        }
        const m = {
          direction: function () {
            return s
          },
          duration: function () {
            return a
          },
          velocity: function () {
            return u
          },
          seek: function () {
            const t = e.get() - n.get()
            let r = 0
            return (
              a
                ? ((u += t / a), (u *= f), (d += u), n.add(u), (r = d - l))
                : ((u = 0), n.set(e), (r = t)),
              (s = c(r)),
              (l = d),
              m
            )
          },
          settled: function () {
            return i(e.get() - t.get()) < 0.001
          },
          useBaseFriction: function () {
            return g(o)
          },
          useBaseDuration: function () {
            return p(r)
          },
          useFriction: g,
          useDuration: p
        }
        return m
      })(Sn, wn, En, V, 0.68),
      Ln = L(R, gn, dn, mn, En),
      Dn = (function (n, t, e, r, o, i, c) {
        function u(o) {
          const u = o.distance,
            s = o.index !== t.get()
          i.add(u),
            u &&
              (r.duration()
                ? n.start()
                : (n.update(), n.render(1), n.update())),
            s && (e.set(t.get()), t.set(o.index), c.emit('select'))
        }
        return {
          distance: function (n, t) {
            u(o.byDistance(n, t))
          },
          index: function (n, e) {
            const r = t.clone().set(n)
            u(o.byIndex(r.get(), e))
          }
        }
      })(bn, hn, yn, On, Ln, En, F),
      In = (function (n) {
        const { max: t, length: e } = n
        return {
          get: function (n) {
            return e ? (n - t) / -e : 0
          }
        }
      })(mn),
      An = h(),
      Mn = T(r, o, F, C),
      { slideRegistry: Tn } = (function (n, t, e, r, o, i) {
        const { groupSlides: c } = o,
          { min: u, max: s } = r
        return {
          slideRegistry: (function () {
            const r = c(i),
              o = !n || 'keepSnaps' === t
            return 1 === e.length
              ? [i]
              : o
              ? r
              : r.slice(u, s).map((n, t, e) => {
                  const r = !t,
                    o = d(e, t)
                  return r
                    ? l(a(e[0]) + 1)
                    : o
                    ? l(f(i) - a(e)[0] + 1, a(e)[0])
                    : n
                })
          })()
        }
      })(tn, $, gn, pn, sn, xn),
      kn = (function (n, e, r, o, i, c) {
        let u = 0
        function s(n) {
          'Tab' === n.code && (u = new Date().getTime())
        }
        function a(s) {
          c.add(
            s,
            'focus',
            () => {
              if (new Date().getTime() - u > 10) return
              n.scrollLeft = 0
              const c = e.indexOf(s),
                a = r.findIndex((n) => n.includes(c))
              t(a) && (i.useDuration(0), o.index(a, 0))
            },
            { passive: !0, capture: !0 }
          )
        }
        return {
          init: function () {
            c.add(document, 'keydown', s, !1), e.forEach(a)
          }
        }
      })(n, o, Tn, Dn, On, An),
      Fn = {
        ownerDocument: p,
        ownerWindow: g,
        eventHandler: F,
        containerRect: X,
        slideRects: Y,
        animation: bn,
        axis: K,
        dragHandler: v(
          K,
          n,
          p,
          g,
          En,
          S(K, g),
          Sn,
          bn,
          Dn,
          On,
          Ln,
          hn,
          F,
          _,
          N,
          B,
          G,
          0.68,
          J
        ),
        eventStore: An,
        percentOfView: _,
        index: hn,
        indexPrevious: yn,
        limit: mn,
        location: Sn,
        offsetLocation: wn,
        options: m,
        resizeHandler: w(r, F, g, o, K, U, Q),
        scrollBody: On,
        scrollBounds: E(mn, wn, En, On, _),
        scrollLooper: O(dn, mn, wn, [Sn, wn, En]),
        scrollProgress: In,
        scrollSnapList: gn.map(In.get),
        scrollSnaps: gn,
        scrollTarget: Ln,
        scrollTo: Dn,
        slideLooper: A(K, Z, dn, rn, on, an, gn, wn, o),
        slideFocus: kn,
        slidesHandler: M(r, F, W),
        slidesInView: Mn,
        slideIndexes: xn,
        slideRegistry: Tn,
        slidesToScroll: sn,
        target: En,
        translate: I(K, r)
      }
    return Fn
  }
  const P = {
    align: 'center',
    axis: 'x',
    container: null,
    slides: null,
    containScroll: 'trimSnaps',
    direction: 'ltr',
    slidesToScroll: 1,
    inViewThreshold: 0,
    breakpoints: {},
    dragFree: !1,
    dragThreshold: 10,
    loop: !1,
    skipSnaps: !1,
    duration: 25,
    startIndex: 0,
    active: !0,
    watchDrag: !0,
    watchResize: !0,
    watchSlides: !0
  }
  function z(n) {
    function t(n, t) {
      return g(n, t || {})
    }
    const e = {
      mergeOptions: t,
      optionsAtMedia: function (e) {
        const r = e.breakpoints || {},
          o = p(r)
            .filter((t) => n.matchMedia(t).matches)
            .map((n) => r[n])
            .reduce((n, e) => t(n, e), {})
        return t(e, o)
      },
      optionsMediaQueries: function (t) {
        return t
          .map((n) => p(n.breakpoints || {}))
          .reduce((n, t) => n.concat(t), [])
          .map(n.matchMedia)
      }
    }
    return e
  }
  function H(n, t, r) {
    const o = n.ownerDocument,
      i = o.defaultView,
      c = z(i),
      u = (function (n) {
        let t = []
        return {
          init: function (e, r) {
            return (
              (t = r.filter(
                ({ options: t }) => !1 !== n.optionsAtMedia(t).active
              )),
              t.forEach((t) => t.init(e, n)),
              r.reduce((n, t) => Object.assign(n, { [t.name]: t }), {})
            )
          },
          destroy: function () {
            t = t.filter((n) => n.destroy())
          }
        }
      })(c),
      s = h(),
      a = (function () {
        const n = {}
        let t
        function e(t) {
          return n[t] || []
        }
        const r = {
          init: function (n) {
            t = n
          },
          emit: function (n) {
            return e(n).forEach((e) => e(t, n)), r
          },
          off: function (t, o) {
            return (n[t] = e(t).filter((n) => n !== o)), r
          },
          on: function (t, o) {
            return (n[t] = e(t).concat([o])), r
          }
        }
        return r
      })(),
      { mergeOptions: f, optionsAtMedia: d, optionsMediaQueries: l } = c,
      { on: p, off: g, emit: m } = a,
      y = A
    let x,
      b,
      v,
      S,
      w = !1,
      E = f(P, H.globalOptions),
      O = f(E),
      L = []
    function D(t) {
      const e = F(n, v, S, o, i, t, a)
      if (t.loop && !e.slideLooper.canLoop()) {
        return D(Object.assign({}, t, { loop: !1 }))
      }
      return e
    }
    function I(t, r) {
      w ||
        ((E = f(E, t)),
        (O = d(E)),
        (L = r || L),
        (function () {
          const { container: t, slides: r } = O,
            o = e(t) ? n.querySelector(t) : t
          v = o || n.children[0]
          const i = e(r) ? v.querySelectorAll(r) : r
          S = [].slice.call(i || v.children)
        })(),
        (x = D(O)),
        l([E, ...L.map(({ options: n }) => n)]).forEach((n) =>
          s.add(n, 'change', A)
        ),
        O.active &&
          (x.translate.to(x.location.get()),
          x.animation.init(),
          x.slidesInView.init(),
          x.slideFocus.init(),
          x.eventHandler.init(j),
          x.resizeHandler.init(j),
          x.slidesHandler.init(j),
          x.options.loop && x.slideLooper.loop(),
          v.offsetParent && S.length && x.dragHandler.init(j),
          (b = u.init(j, L))))
    }
    function A(n, t) {
      const e = k()
      M(), I(f({ startIndex: e }, n), t), a.emit('reInit')
    }
    function M() {
      x.dragHandler.destroy(),
        x.eventStore.clear(),
        x.translate.clear(),
        x.slideLooper.clear(),
        x.resizeHandler.destroy(),
        x.slidesHandler.destroy(),
        x.slidesInView.destroy(),
        x.animation.destroy(),
        u.destroy(),
        s.clear()
    }
    function T(n, t, e) {
      O.active &&
        !w &&
        (x.scrollBody.useBaseFriction().useDuration(!0 === t ? 0 : O.duration),
        x.scrollTo.index(n, e || 0))
    }
    function k() {
      return x.index.get()
    }
    const j = {
      canScrollNext: function () {
        return x.index.add(1).get() !== k()
      },
      canScrollPrev: function () {
        return x.index.add(-1).get() !== k()
      },
      containerNode: function () {
        return v
      },
      internalEngine: function () {
        return x
      },
      destroy: function () {
        w || ((w = !0), s.clear(), M(), a.emit('destroy'))
      },
      off: g,
      on: p,
      emit: m,
      plugins: function () {
        return b
      },
      previousScrollSnap: function () {
        return x.indexPrevious.get()
      },
      reInit: y,
      rootNode: function () {
        return n
      },
      scrollNext: function (n) {
        T(x.index.add(1).get(), n, -1)
      },
      scrollPrev: function (n) {
        T(x.index.add(-1).get(), n, 1)
      },
      scrollProgress: function () {
        return x.scrollProgress.get(x.location.get())
      },
      scrollSnapList: function () {
        return x.scrollSnapList
      },
      scrollTo: T,
      selectedScrollSnap: k,
      slideNodes: function () {
        return S
      },
      slidesInView: function () {
        return x.slidesInView.get()
      },
      slidesNotInView: function () {
        return x.slidesInView.get(!1)
      }
    }
    return I(t, r), setTimeout(() => a.emit('init'), 0), j
  }
  function j(n) {
    return (
      (function (n) {
        return '[object Object]' === Object.prototype.toString.call(n)
      })(n) || Array.isArray(n)
    )
  }
  function R(n, t) {
    const e = Object.keys(n),
      r = Object.keys(t)
    if (e.length !== r.length) return !1
    return (
      JSON.stringify(Object.keys(n.breakpoints || {})) ===
        JSON.stringify(Object.keys(t.breakpoints || {})) &&
      e.every((e) => {
        const r = n[e],
          o = t[e]
        return 'function' == typeof r
          ? `${r}` == `${o}`
          : j(r) && j(o)
          ? R(r, o)
          : r === o
      })
    )
  }
  function V(n) {
    return n
      .concat()
      .sort((n, t) => (n.name > t.name ? 1 : -1))
      .map((n) => n.options)
  }
  function N(t = {}, e = []) {
    const r = n.useRef(t),
      o = n.useRef(e),
      [i, c] = n.useState(),
      [u, s] = n.useState(),
      a = n.useCallback(() => {
        i && i.reInit(r.current, o.current)
      }, [i])
    return (
      n.useEffect(() => {
        if (
          'undefined' != typeof window &&
          window.document &&
          window.document.createElement &&
          u
        ) {
          H.globalOptions = N.globalOptions
          const n = H(u, r.current, o.current)
          return c(n), () => n.destroy()
        }
        c(void 0)
      }, [u, c]),
      n.useEffect(() => {
        R(r.current, t) || ((r.current = t), a())
      }, [t, a]),
      n.useEffect(() => {
        ;(function (n, t) {
          if (n.length !== t.length) return !1
          const e = V(n),
            r = V(t)
          return e.every((n, t) => R(n, r[t]))
        })(o.current, e) || ((o.current = e), a())
      }, [e, a]),
      [s, i]
    )
  }
  return (H.globalOptions = void 0), (N.globalOptions = void 0), N
})
