/* =========================================================
   Venessa landing — interactions
   ========================================================= */

(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Once the intro has played, lock in the final state.
  window.setTimeout(() => document.body.classList.add("ready"), 2200);

  /* ---------- nav scroll state ---------- */
  const nav = document.getElementById("site-nav");
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobile-menu");

  const setMenu = (open) => {
    if (!burger || !menu) return;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  };

  if (burger && menu) {
    burger.addEventListener("click", () => {
      setMenu(burger.getAttribute("aria-expanded") !== "true");
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenu(false);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 960) setMenu(false);
    });
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = Array.from(document.querySelectorAll("[data-reveal]"));

  const countUp = (el) => {
    const target = Number(el.dataset.count || 0);
    if (!Number.isFinite(target) || target === 0) {
      el.textContent = String(target);
      return;
    }
    const duration = 950;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = String(target);
    };
    requestAnimationFrame(tick);
  };

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => {
      el.classList.add("in");
      el.querySelectorAll("[data-count]").forEach((n) => {
        n.textContent = n.dataset.count;
      });
    });
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          entry.target.querySelectorAll("[data-count]").forEach(countUp);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  /* ---------- hero console: live failure cycle ---------- */
  const heroExt = document.getElementById("heroExt");
  const heroExtSub = document.getElementById("heroExtSub");
  const heroCheckout = document.getElementById("heroCheckout");
  const heroAdapter = document.getElementById("heroAdapter");
  const heroErr = document.getElementById("heroErr");
  const heroP99 = document.getElementById("heroP99");
  const heroBreach = document.getElementById("heroBreach");
  const heroRec = document.getElementById("heroRec");
  const heroClock = document.getElementById("heroClock");
  const heroVerdict = document.getElementById("heroVerdict");
  const heroVerdictDot = document.getElementById("heroVerdictDot");

  const phases = [
    {
      down: false,
      extSub: "250ms p50",
      checkout: "p99 42ms",
      adapter: "pool 40 / 40",
      err: "0.0%",
      p99: "1.2s",
      breach: "0s",
      rec: "—",
      clock: "t = 04:10",
      verdict: "Nominal",
      dot: "dot-ok",
    },
    {
      down: true,
      extSub: "no response",
      checkout: "p99 4.2s",
      adapter: "queue 118",
      err: "18.3%",
      p99: "4.2s",
      breach: "94s",
      rec: "—",
      clock: "t = 04:26",
      verdict: "SLO breached",
      dot: "dot-bad",
    },
    {
      down: false,
      extSub: "restored",
      checkout: "p99 61ms",
      adapter: "pool 11 / 40",
      err: "0.4%",
      p99: "1.4s",
      breach: "94s",
      rec: "94s",
      clock: "t = 06:04",
      verdict: "Degraded, recovered",
      dot: "dot-warn",
    },
  ];

  if (heroExt && heroErr) {
    let phase = 0;
    const applyPhase = () => {
      const p = phases[phase];
      heroExt.classList.toggle("is-down", p.down);
      if (heroExtSub) heroExtSub.textContent = p.extSub;
      if (heroCheckout) heroCheckout.textContent = p.checkout;
      if (heroAdapter) heroAdapter.textContent = p.adapter;
      if (heroP99) heroP99.textContent = p.p99;
      if (heroBreach) heroBreach.textContent = p.breach;
      if (heroRec) heroRec.textContent = p.rec;
      if (heroClock) heroClock.textContent = p.clock;
      if (heroVerdict) heroVerdict.textContent = p.verdict;
      if (heroVerdictDot) {
        heroVerdictDot.classList.remove("dot-ok", "dot-warn", "dot-bad");
        heroVerdictDot.classList.add(p.dot);
      }
      // error rate gets a subtle pop whenever it changes
      if (heroErr.textContent !== p.err) {
        heroErr.textContent = p.err;
        heroErr.animate(
          [
            { opacity: 0.35, transform: "translateY(-2px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 380, easing: "ease-out" }
        );
      }
      phase = (phase + 1) % phases.length;
    };

    if (!reduceMotion) {
      applyPhase();
      let timer = window.setInterval(applyPhase, 4800);
      document.addEventListener("visibilitychange", () => {
        window.clearInterval(timer);
        if (!document.hidden) timer = window.setInterval(applyPhase, 4800);
      });
    }
  }
})();
