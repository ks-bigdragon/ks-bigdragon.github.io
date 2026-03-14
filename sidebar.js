(function () {

	const CONFIG = {
		subtitle: 'Kingshot Guides',
		items: [
			{
				category: 'Alliance Events',
				links: [
				{ label: 'Viking Vengeance',    href: 'Viking-Vengeance.html',    icon: '⚔️' },
				{ label: 'Swordland Showdown',  href: 'Swordland-Showdown.html',  icon: '🗡️' },
				{ label: 'Bear Trap',           href: 'Bear-Trap.html',           icon: '🐻' },
				],
			},
			{
				category: 'Individual Events',
				links: [
				{ label: 'Hall of Governor New Server',    href: 'Hall-of-Governor-New-Server.html', icon: '🏛️' },
				],
			},
		],
	};
	
	const LS_KEY = 'sb_open';

	let isOpen = localStorage.getItem(LS_KEY) === '1';

	const currentPage = window.location.pathname.split('/').pop() || '';

	function buildNav() {
		return CONFIG.items.map(group => {
			const links = group.links.map(link => {
				const active = link.href === currentPage;
				return `<a
					href="${link.href}"
					class="sb-link relative flex items-center gap-3 mx-2 my-0.5 px-3 py-2.5 rounded-xl no-underline cursor-pointer transition-colors duration-150
						${active
							? 'bg-[linear-gradient(90deg,rgba(239,68,68,0.14),rgba(239,68,68,0.03))] border border-red-500/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
							: 'border border-transparent'}"
					data-active="${active}"
				>
					<span class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full
						${active
							? 'bg-[linear-gradient(180deg,#f87171,#dc2626)] shadow-[0_0_8px_rgba(239,68,68,0.5)]'
							: 'bg-transparent'}">
					</span>
					<span class="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-base
						${active
							? 'bg-red-500/[0.15] border border-red-500/25 shadow-[0_0_16px_rgba(239,68,68,0.15)]'
							: 'bg-white/[0.03] border border-white/[0.06]'}">
						${link.icon}
					</span>
					<span class="text-[13px] font-semibold font-sans leading-tight truncate
						${active ? 'text-red-300' : 'text-slate-500'}">
						${link.label}
					</span>
				</a>`;
			}).join('');
			return `
				<p class="px-5 pt-5 pb-1.5 text-[9px] font-black font-sans uppercase tracking-[0.15em] text-[#1e3a5f]">${group.category}</p>
				${links}`;
		}).join('');
	}

	const overlay = document.createElement('div');
	overlay.className = 'fixed inset-0 z-[199] transition-[background,backdrop-filter] duration-300 pointer-events-none bg-transparent backdrop-blur-none';

	const sidebar = document.createElement('div');
	sidebar.id = 'sb-wrap';
	sidebar.className = [
		'fixed top-0 left-0 h-screen z-[200] flex flex-col w-64',
		'-translate-x-full transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)]',
		'bg-[linear-gradient(160deg,#0f1729_0%,#090e1a_100%)]',
		'border-r border-white/[0.05]',
		'shadow-[8px_0_48px_rgba(0,0,0,0.7),1px_0_0_rgba(255,255,255,0.03)]',
	].join(' ');
	sidebar.innerHTML = `
		<div class="shrink-0 px-4 pt-5 pb-4 border-b border-white/[0.04]">
			<a href="/" class="flex items-center gap-3 no-underline group">
				<div class="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-lg
					bg-[linear-gradient(135deg,rgba(239,68,68,0.18),rgba(239,68,68,0.04))]
					border border-red-500/[0.18]
					shadow-[0_0_20px_rgba(239,68,68,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]
					transition-shadow duration-200 group-hover:shadow-[0_0_28px_rgba(239,68,68,0.22)]">
					⚔️
				</div>
				<div class="flex flex-col overflow-hidden">
					<span class="text-[15px] font-black font-sans text-white leading-none tracking-tight transition-colors duration-200 group-hover:text-red-300">
						[BIG]<span class="text-red-400">DRAGON</span>
					</span>
					<span class="text-[10px] font-sans text-[#1e3a5f] mt-0.5 uppercase tracking-[0.1em] truncate">
						${CONFIG.subtitle}
					</span>
				</div>
			</a>
		</div>
		<nav class="flex-1 overflow-y-auto overflow-x-hidden py-2
			[&::-webkit-scrollbar]:w-px
			[&::-webkit-scrollbar-thumb]:bg-slate-800">
			${buildNav()}
		</nav>
		<div class="shrink-0 px-4 py-3 border-t border-white/[0.04]">
			<div class="flex items-center gap-2">
				<span class="w-1.5 h-1.5 rounded-full shrink-0
					bg-[radial-gradient(circle,#4ade80,#16a34a)]
					shadow-[0_0_8px_rgba(74,222,128,0.7)]">
				</span>
				<span class="text-[10px] font-sans text-[#1e3a5f] uppercase tracking-[0.1em]">sidebar.js</span>
			</div>
		</div>
	`;

	const toggleBtn = document.createElement('button');
	toggleBtn.id = 'sb-toggle';
	toggleBtn.setAttribute('aria-label', 'Toggle menu');
	toggleBtn.className = [
		'fixed bottom-5 right-5 z-[201] w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer',
		'transition-[transform,background,border-color,box-shadow] duration-200',
		'bg-[linear-gradient(145deg,#1a2540,#0d1525)]',
		'border border-white/[0.09]',
		'shadow-[0_8px_32px_rgba(0,0,0,0.6),0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]',
		'hover:scale-105 active:scale-95',
	].join(' ');
	toggleBtn.innerHTML = `<svg id="sb-icon"
		viewBox="0 0 24 24" fill="none"
		stroke-linecap="round" stroke-linejoin="round"
		class="w-[18px] h-[18px] stroke-slate-400 transition-[stroke] duration-200"
		style="stroke-width:2">
		<line x1="3" y1="6" x2="21" y2="6"/>
		<line x1="3" y1="12" x2="21" y2="12"/>
		<line x1="3" y1="18" x2="21" y2="18"/>
	</svg>`;

	document.body.prepend(overlay);
	document.body.prepend(sidebar);
	document.body.appendChild(toggleBtn);

	const sbLinks = sidebar.querySelectorAll('.sb-link');
	sbLinks.forEach(link => {
		if (link.dataset.active === 'true') return;
		link.addEventListener('mouseenter', () => {
			link.classList.add('bg-white/[0.04]', 'border-white/[0.06]');
			link.querySelector('span:nth-child(3)')?.classList.replace('text-slate-500', 'text-slate-200');
		});
		link.addEventListener('mouseleave', () => {
			link.classList.remove('bg-white/[0.04]', 'border-white/[0.06]');
			link.querySelector('span:nth-child(3)')?.classList.replace('text-slate-200', 'text-slate-500');
		});
	});

	function setIcon(open) {
		const icon = document.getElementById('sb-icon');
		icon.classList.toggle('stroke-red-400',   open);
		icon.classList.toggle('stroke-slate-400', !open);
		icon.innerHTML = open
			? `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`
			: `<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>`;
	}

	function setBtn(open) {
		const on  = ['bg-[linear-gradient(145deg,rgba(220,38,38,0.18),rgba(127,29,29,0.12))]', 'border-red-500/[0.28]', 'shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(239,68,68,0.12),inset_0_1px_0_rgba(255,255,255,0.05)]'];
		const off = ['bg-[linear-gradient(145deg,#1a2540,#0d1525)]',                           'border-white/[0.09]',    'shadow-[0_8px_32px_rgba(0,0,0,0.6),0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]'];
		toggleBtn.classList.remove(...on, ...off);
		toggleBtn.classList.add(...(open ? on : off));
	}

	function setOverlay(open) {
		overlay.classList.toggle('bg-black/65',       open);
		overlay.classList.toggle('backdrop-blur-md',  open);
		overlay.classList.toggle('pointer-events-auto', open);
		overlay.classList.toggle('pointer-events-none', !open);
	}

	function setOpen(val) {
		isOpen = val;
		localStorage.setItem(LS_KEY, isOpen ? '1' : '0');
		document.body.style.overflow = isOpen ? 'hidden' : '';
		sidebar.classList.toggle('-translate-x-full', !isOpen);
		setOverlay(isOpen);
		setBtn(isOpen);
		setIcon(isOpen);
	}

	setOpen(isOpen);

	toggleBtn.addEventListener('click', () => setOpen(!isOpen));
	overlay.addEventListener('click',   () => setOpen(false));

})();
