document.addEventListener("DOMContentLoaded", () => {
	const counters = document.querySelectorAll("[data-target]");
	const formatNumber = (value) => Math.round(value).toLocaleString("en-US");

	const animateCounter = (el) => {
		const target = Number(el.dataset.target);
		const suffix = el.dataset.suffix || "";
		const duration = 1800;
		const start = performance.now();

		const step = (now) => {
			const progress = Math.min((now - start) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			el.textContent = formatNumber(target * eased) + suffix;
			if (progress < 1) requestAnimationFrame(step);
		};

		requestAnimationFrame(step);
	};

	if (counters.length) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						animateCounter(entry.target);
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.4 },
		);
		counters.forEach((el) => observer.observe(el));
	}

	document.querySelectorAll(".discord-btn").forEach((btn) => {
		const toast = btn.querySelector(".toast");
		btn.addEventListener("click", async () => {
			const handle = btn.dataset.discord || "@caicedo";
			try {
				await navigator.clipboard.writeText(handle);
				if (toast) {
					toast.textContent = `Copied ${handle}, add me on Discord`;
					toast.classList.add("show");
					setTimeout(() => toast.classList.remove("show"), 2200);
				}
			} catch (err) {
				if (toast) {
					toast.textContent = handle;
					toast.classList.add("show");
					setTimeout(() => toast.classList.remove("show"), 2200);
				}
			}
		});
	});

	const filterButtons = document.querySelectorAll("[data-filter]");
	const videoGrid = document.querySelector("[data-video-grid]");
	if (filterButtons.length && videoGrid) {
		const cards = videoGrid.querySelectorAll("[data-category]");
		const applyFilter = (filter) => {
			cards.forEach((card) => {
				card.hidden = card.dataset.category !== filter;
			});
			filterButtons.forEach((btn) => {
				const isActive = btn.dataset.filter === filter;
				btn.classList.toggle("is-active", isActive);
				btn.setAttribute("aria-pressed", String(isActive));
			});
		};
		filterButtons.forEach((btn) => {
			btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
		});
		applyFilter(filterButtons[0].dataset.filter);
	}

	const disclaimer = document.querySelector("[data-disclaimer]");
	if (disclaimer) {
		const key = "pw-disclaimer-dismissed";
		if (localStorage.getItem(key) === "1") {
			disclaimer.classList.add("hidden");
		}
		const closeBtn = disclaimer.querySelector(".disclaimer-close");
		if (closeBtn) {
			closeBtn.addEventListener("click", () => {
				disclaimer.classList.add("hidden");
				localStorage.setItem(key, "1");
			});
		}
	}
});
