import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Flame,
  Home,
  Lock,
  LogOut,
  Menu,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  User,
  Users,
  X,
  Zap,
} from 'lucide-react'

const curriculum = [
  {
    number: '01',
    title: 'AI là gì?',
    subtitle: 'Khám phá cách máy tính “học” từ dữ liệu.',
    color: 'purple',
    icon: BrainCircuit,
    lessons: 5,
    duration: '42 phút',
    progress: 60,
  },
  {
    number: '02',
    title: 'Dữ liệu quanh ta',
    subtitle: 'Hiểu dữ liệu, nhãn và cách AI nhận biết thế giới.',
    color: 'blue',
    icon: BarChart3,
    lessons: 6,
    duration: '50 phút',
    progress: 0,
  },
  {
    number: '03',
    title: 'Trò chuyện cùng AI',
    subtitle: 'Viết câu lệnh rõ ràng và kiểm chứng câu trả lời.',
    color: 'orange',
    icon: MessageCircle,
    lessons: 5,
    duration: '45 phút',
    progress: 0,
  },
  {
    number: '04',
    title: 'AI có công bằng?',
    subtitle: 'Nhận diện thiên kiến và sử dụng AI có trách nhiệm.',
    color: 'green',
    icon: ShieldCheck,
    lessons: 7,
    duration: '55 phút',
    progress: 0,
  },
]

function Logo({ light = false }) {
  return (
    <div className={`logo ${light ? 'logo-light' : ''}`}>
      <span className="logo-mark"><Sparkles size={20} strokeWidth={2.6} /></span>
      <span>AIventure</span>
    </div>
  )
}

function AuthModal({ initialMode, onClose, onSuccess }) {
  const [mode, setMode] = useState(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => setMode(initialMode), [initialMode])

  function submit(event) {
    event.preventDefault()
    if (mode === 'register' && name.trim().length < 2) {
      setError('Hãy nhập tên của bạn nhé!')
      return
    }
    if (!email.includes('@') || password.length < 6) {
      setError('Email chưa đúng hoặc mật khẩu chưa đủ 6 ký tự.')
      return
    }
    onSuccess({ name: name.trim() || email.split('@')[0], email })
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="auth-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Đóng"><X size={20} /></button>
        <Logo />
        <div className="auth-heading">
          <span className="eyebrow">BẮT ĐẦU HÀNH TRÌNH</span>
          <h2>{mode === 'login' ? 'Chào mừng bạn trở lại!' : 'Tạo tài khoản miễn phí'}</h2>
          <p>{mode === 'login' ? 'Tiếp tục khám phá thế giới AI nào.' : 'Mỗi ngày 15 phút để hiểu AI thật dễ dàng.'}</p>
        </div>

        <div className="auth-switch">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => { setMode('login'); setError('') }}>Đăng nhập</button>
          <button className={mode === 'register' ? 'active' : ''} onClick={() => { setMode('register'); setError('') }}>Đăng ký</button>
        </div>

        <form onSubmit={submit}>
          {mode === 'register' && (
            <label>Họ và tên
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ví dụ: Minh Anh" autoFocus />
            </label>
          )}
          <label>Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ban@email.com" autoFocus={mode === 'login'} />
          </label>
          <label>Mật khẩu
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ít nhất 6 ký tự" />
          </label>
          {error && <div className="form-error">{error}</div>}
          <button className="button button-primary auth-submit" type="submit">
            {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'} <ArrowRight size={18} />
          </button>
        </form>
        <p className="auth-note"><Lock size={13} /> Bản trải nghiệm — thông tin chỉ được lưu trên thiết bị này.</p>
      </div>
    </div>
  )
}

function Landing({ onAuth }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="landing">
      <header className="site-header">
        <div className="container nav-inner">
          <Logo />
          <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
            <a href="#learn" onClick={() => setMenuOpen(false)}>Chương trình học</a>
            <a href="#method" onClick={() => setMenuOpen(false)}>Cách học</a>
            <a href="#parents" onClick={() => setMenuOpen(false)}>Cho phụ huynh</a>
          </nav>
          <div className="nav-actions">
            <button className="text-button" onClick={() => onAuth('login')}>Đăng nhập</button>
            <button className="button button-small button-dark" onClick={() => onAuth('register')}>Học miễn phí</button>
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Mở menu"><Menu size={22} /></button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-copy">
            <div className="hero-pill"><span>✦</span> AI KHÔNG KHÓ NHƯ BẠN NGHĨ</div>
            <h1>Hiểu AI.<br /><em>Làm chủ</em> tương lai.</h1>
            <p className="hero-description">Nền tảng học AI tương tác dành riêng cho học sinh THCS. Không công thức khô khan — chỉ có khám phá, thử thách và những khoảnh khắc “À, ra là vậy!”.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => onAuth('register')}>Bắt đầu khám phá <ArrowRight size={19} /></button>
              <a className="watch-link" href="#method"><span><Play size={16} fill="currentColor" /></span> Xem cách học</a>
            </div>
            <div className="trust-row">
              <div className="avatar-stack"><span>MA</span><span>TN</span><span>KL</span></div>
              <div><div className="stars">★★★★★</div><small>Hơn 2.000 bạn nhỏ đang học</small></div>
            </div>
          </div>

          <div className="hero-visual" aria-label="Minh họa bài học AI tương tác">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="floating-tag tag-one"><Zap size={15} fill="currentColor" /> Học bằng thực hành</div>
            <div className="floating-tag tag-two"><Trophy size={16} /> +120 XP</div>
            <div className="lesson-preview">
              <div className="preview-top">
                <span className="preview-dots"><i /><i /><i /></span>
                <span>BÀI 1 · AI LÀ GÌ?</span>
                <CircleHelp size={16} />
              </div>
              <div className="preview-body">
                <div className="mini-label">THỬ THÁCH 2/5</div>
                <h3>Đâu là sản phẩm<br />có sử dụng AI?</h3>
                <div className="choice-grid">
                  <button><span className="choice-icon">🧮</span><b>Máy tính bỏ túi</b></button>
                  <button className="selected"><span className="choice-icon">🎵</span><b>Gợi ý bài hát</b><span className="correct"><Check size={14} /></span></button>
                  <button><span className="choice-icon">💡</span><b>Bóng đèn thường</b></button>
                  <button><span className="choice-icon">⏰</span><b>Đồng hồ báo thức</b></button>
                </div>
                <div className="preview-feedback"><Sparkles size={19} /><span><b>Chính xác!</b><br />AI học sở thích để gợi ý nhạc cho bạn.</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="proof-strip">
          <div className="container proof-grid">
            <div><strong>15 phút</strong><span>mỗi ngày</span></div>
            <div><strong>24+</strong><span>bài học tương tác</span></div>
            <div><strong>100%</strong><span>tiếng Việt</span></div>
            <div><strong>0₫</strong><span>để bắt đầu</span></div>
          </div>
        </section>

        <section className="curriculum-section" id="learn">
          <div className="container">
            <div className="section-heading centered">
              <span className="eyebrow">LỘ TRÌNH AI LITERACY</span>
              <h2>Từ tò mò đến <em>tự tin với AI</em></h2>
              <p>Bốn chặng học được thiết kế vừa sức, gần gũi và luôn có điều bất ngờ.</p>
            </div>
            <div className="curriculum-grid">
              {curriculum.map((item, index) => {
                const Icon = item.icon
                return (
                  <article className={`course-card course-${item.color}`} key={item.title}>
                    <div className="course-number">{item.number}</div>
                    <div className="course-icon"><Icon size={27} /></div>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                    <div className="course-meta"><span><BookOpen size={15} /> {item.lessons} bài</span><span><Clock3 size={15} /> {item.duration}</span></div>
                    <button onClick={() => onAuth(index === 0 ? 'register' : 'login')}>Khám phá chương <ChevronRight size={17} /></button>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="method-section" id="method">
          <div className="container method-grid">
            <div className="method-visual">
              <div className="phone-card">
                <div className="phone-progress"><span style={{ width: '72%' }} /></div>
                <span className="mini-label">NỐI KHÁI NIỆM</span>
                <h4>Kéo mỗi ví dụ vào đúng nhóm</h4>
                <div className="sort-target"><span>🤖</span><b>AI có học từ dữ liệu</b></div>
                <div className="draggable-chip">Bộ lọc khuôn mặt <span>👤</span></div>
                <div className="draggable-chip">Quạt điện <span>💨</span></div>
              </div>
              <div className="method-badge"><Flame size={23} fill="currentColor" /><div><b>7 ngày</b><span>chuỗi học tập</span></div></div>
            </div>
            <div className="method-copy">
              <span className="eyebrow">HỌC BẰNG CÁCH LÀM</span>
              <h2>Mỗi cú chạm là một lần <em>hiểu sâu hơn</em></h2>
              <p>Không ngồi xem video dài. Bạn sẽ dự đoán, kéo thả, tranh luận và tự tay giải những tình huống AI có thật trong cuộc sống.</p>
              <ul className="feature-list">
                <li><span><Zap size={20} /></span><div><b>Tương tác ngay từ phút đầu</b><small>Thử trước, hiểu sau — kiến thức tự nhiên ở lại.</small></div></li>
                <li><span><Target size={20} /></span><div><b>Vừa sức với từng bạn</b><small>Độ khó thay đổi theo nhịp học của riêng bạn.</small></div></li>
                <li><span><ShieldCheck size={20} /></span><div><b>An toàn và có trách nhiệm</b><small>Biết kiểm chứng, bảo vệ dữ liệu và dùng AI đúng cách.</small></div></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="parents-section" id="parents">
          <div className="container parents-card">
            <div>
              <span className="eyebrow">DÀNH CHO PHỤ HUYNH</span>
              <h2>Không chỉ biết dùng AI.<br />Con hiểu điều gì đang diễn ra.</h2>
            </div>
            <div className="parent-points">
              <p><Check size={18} /> Nội dung phù hợp lứa tuổi 11–15</p>
              <p><Check size={18} /> Báo cáo tiến độ rõ ràng mỗi tuần</p>
              <p><Check size={18} /> Không quảng cáo, không nội dung gây nghiện</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container cta-card">
            <div className="cta-spark">✦</div>
            <span className="eyebrow">SẴN SÀNG CHƯA?</span>
            <h2>Tương lai thuộc về người<br /><em>hiểu cách AI hoạt động.</em></h2>
            <button className="button button-light" onClick={() => onAuth('register')}>Học bài đầu tiên <ArrowRight size={19} /></button>
            <p>Miễn phí · Không cần thẻ · Bắt đầu trong 30 giây</p>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner"><Logo light /><p>© 2026 AIventure. Nuôi dưỡng thế hệ làm chủ công nghệ.</p><div><a href="#learn">Chương trình</a><a href="#parents">Phụ huynh</a></div></div>
      </footer>
    </div>
  )
}

function LessonView({ onBack, onComplete }) {
  const [answer, setAnswer] = useState(null)
  const [step, setStep] = useState(1)

  const next = () => {
    if (step < 3) {
      setStep(step + 1)
      setAnswer(null)
    } else onComplete()
  }

  const questions = [
    { title: 'Theo bạn, AI khác chương trình thông thường ở điểm nào?', options: ['AI luôn có hình dạng robot', 'AI có thể học mẫu từ dữ liệu', 'AI biết mọi thứ trên Internet'], correct: 1 },
    { title: 'Ví dụ nào đang dùng AI để cá nhân hóa?', options: ['Ứng dụng gợi ý phim theo sở thích', 'Chiếc thước kẻ 20 cm', 'Công tắc bật đèn'], correct: 0 },
    { title: 'Khi AI đưa ra câu trả lời, chúng ta nên làm gì?', options: ['Tin ngay vì AI không sai', 'Chia sẻ ngay cho bạn bè', 'Kiểm tra lại bằng nguồn đáng tin'], correct: 2 },
  ]
  const question = questions[step - 1]

  return (
    <div className="lesson-view">
      <header className="lesson-header">
        <button onClick={onBack}><X size={22} /></button>
        <div className="lesson-progress"><span style={{ width: `${step * 33.33}%` }} /></div>
        <div className="lesson-hearts">♥ ♥ ♥</div>
      </header>
      <main className="lesson-content">
        <span className="lesson-step">THỬ THÁCH {step} / 3</span>
        <div className="lesson-mascot">{step === 1 ? '🤖' : step === 2 ? '🎬' : '🔍'}</div>
        <h1>{question.title}</h1>
        <p>Chọn một đáp án đúng nhất.</p>
        <div className="answer-list">
          {question.options.map((option, index) => (
            <button
              key={option}
              className={`${answer === index ? 'chosen' : ''} ${answer !== null && index === question.correct ? 'right' : ''} ${answer === index && index !== question.correct ? 'wrong' : ''}`}
              onClick={() => answer === null && setAnswer(index)}
            >
              <span>{String.fromCharCode(65 + index)}</span>{option}
              {answer !== null && index === question.correct && <Check size={20} />}
            </button>
          ))}
        </div>
      </main>
      {answer !== null && (
        <div className={`lesson-result ${answer === question.correct ? 'success' : 'retry'}`}>
          <div><b>{answer === question.correct ? 'Tuyệt vời, chính xác!' : 'Chưa đúng, nhưng không sao!'}</b><span>{answer === question.correct ? 'AI nhận diện các mẫu trong dữ liệu để dự đoán hoặc đưa ra gợi ý.' : `Đáp án đúng là: “${question.options[question.correct]}”.`}</span></div>
          <button onClick={next}>{step === 3 ? 'Hoàn thành' : 'Tiếp tục'} <ArrowRight size={18} /></button>
        </div>
      )}
    </div>
  )
}

function Dashboard({ user, onLogout }) {
  const [active, setActive] = useState('home')
  const [lessonOpen, setLessonOpen] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const firstName = user.name.split(' ')[0]

  if (lessonOpen) return <LessonView onBack={() => setLessonOpen(false)} onComplete={() => { setLessonOpen(false); setCompleted(true) }} />

  return (
    <div className="app-shell">
      <aside className={mobileNav ? 'app-sidebar show' : 'app-sidebar'}>
        <div className="sidebar-logo"><Logo /></div>
        <nav>
          <button className={active === 'home' ? 'active' : ''} onClick={() => { setActive('home'); setMobileNav(false) }}><Home size={20} /> Trang chủ</button>
          <button className={active === 'learn' ? 'active' : ''} onClick={() => { setActive('learn'); setMobileNav(false) }}><BookOpen size={20} /> Khám phá</button>
          <button className={active === 'progress' ? 'active' : ''} onClick={() => { setActive('progress'); setMobileNav(false) }}><BarChart3 size={20} /> Tiến độ</button>
          <button className={active === 'awards' ? 'active' : ''} onClick={() => { setActive('awards'); setMobileNav(false) }}><Award size={20} /> Thành tích</button>
        </nav>
        <div className="sidebar-tip"><div>💡</div><b>Mẹo hôm nay</b><p>AI có thể mắc lỗi. Luôn kiểm tra thông tin quan trọng nhé!</p></div>
        <button className="logout-button" onClick={onLogout}><LogOut size={18} /> Đăng xuất</button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <button className="dashboard-menu" onClick={() => setMobileNav(!mobileNav)}><Menu size={22} /></button>
          <div className="daily-stats">
            <span><Flame size={19} fill="currentColor" /> <b>7</b> ngày</span>
            <span><Zap size={19} fill="currentColor" /> <b>{completed ? '1.360' : '1.240'}</b> XP</span>
          </div>
          <button className="profile-pill"><span>{firstName.slice(0, 1).toUpperCase()}</span><div><b>{user.name}</b><small>Học viên AI</small></div><ChevronRight size={16} /></button>
        </header>

        <div className="dashboard-content">
          {active === 'home' && (
            <>
              <section className="welcome-row">
                <div><p>THỨ HAI, 10 THÁNG 8</p><h1>Chào {firstName}! <span>👋</span></h1><h2>Sẵn sàng khám phá điều mới?</h2></div>
                <div className="weekly-goal"><div className="goal-ring"><b>4</b><span>/ 5 ngày</span></div><div><small>MỤC TIÊU TUẦN</small><b>Sắp hoàn thành rồi!</b><span>Học thêm 1 ngày để nhận +100 XP</span></div></div>
              </section>

              {completed && <div className="completion-banner"><Trophy size={24} /><div><b>Bạn vừa hoàn thành một bài học!</b><span>+120 XP đã được cộng vào hành trình của bạn.</span></div><button onClick={() => setCompleted(false)}><X size={17} /></button></div>}

              <section className="continue-card">
                <div className="continue-art"><BrainCircuit size={55} /><span className="art-orbit" /></div>
                <div className="continue-copy">
                  <span className="mini-label">TIẾP TỤC HỌC</span>
                  <h2>AI là gì?</h2>
                  <p>Bài 3 · Máy học như thế nào?</p>
                  <div className="inline-progress"><span><i style={{ width: completed ? '80%' : '60%' }} /></span><b>{completed ? '4/5' : '3/5'} bài</b></div>
                </div>
                <button className="button button-primary" onClick={() => setLessonOpen(true)}>{completed ? 'Học tiếp' : 'Tiếp tục'} <ArrowRight size={18} /></button>
              </section>

              <section className="dashboard-section">
                <div className="dashboard-title"><div><h2>Lộ trình của bạn</h2><p>Từng bước trở thành công dân AI thông thái.</p></div><button onClick={() => setActive('learn')}>Xem tất cả <ArrowRight size={16} /></button></div>
                <div className="path-list">
                  {curriculum.map((course, index) => {
                    const Icon = course.icon
                    const locked = index > 1
                    return (
                      <article key={course.title} className={`path-card ${index === 0 ? 'current' : ''} ${locked ? 'locked' : ''}`}>
                        <div className={`path-icon ${course.color}`}><Icon size={24} /></div>
                        <div className="path-info"><span>CHƯƠNG {index + 1}</span><h3>{course.title}</h3><p>{course.subtitle}</p></div>
                        {locked ? <Lock size={18} /> : index === 0 ? <div className="circle-progress">{completed ? '80%' : '60%'}</div> : <button onClick={() => setLessonOpen(true)}><Play size={16} fill="currentColor" /></button>}
                      </article>
                    )
                  })}
                </div>
              </section>
            </>
          )}

          {active === 'learn' && <ExploreView onStart={() => setLessonOpen(true)} />}
          {active === 'progress' && <ProgressView completed={completed} />}
          {active === 'awards' && <AwardsView completed={completed} />}
        </div>
      </main>
    </div>
  )
}

function ExploreView({ onStart }) {
  return (
    <section className="inner-page">
      <span className="eyebrow">THƯ VIỆN BÀI HỌC</span>
      <h1>Khám phá AI, theo cách của bạn</h1>
      <p>Chọn một chủ đề và bắt đầu thử thách mới.</p>
      <div className="explore-grid">
        {curriculum.map((course, i) => {
          const Icon = course.icon
          return <article className={`explore-card ${course.color}`} key={course.title}><div className="explore-art"><Icon size={38} /></div><span>CHƯƠNG {i + 1}</span><h2>{course.title}</h2><p>{course.subtitle}</p><div><small><BookOpen size={14} /> {course.lessons} bài học</small><small><Clock3 size={14} /> {course.duration}</small></div><button onClick={onStart}>{i === 0 ? 'Tiếp tục học' : 'Bắt đầu chương'} <ArrowRight size={17} /></button></article>
        })}
      </div>
    </section>
  )
}

function ProgressView({ completed }) {
  const stats = [{ label: 'Tổng XP', value: completed ? '1.360' : '1.240', icon: Zap }, { label: 'Chuỗi học', value: '7 ngày', icon: Flame }, { label: 'Bài đã học', value: completed ? '13' : '12', icon: BookOpen }]
  return (
    <section className="inner-page">
      <span className="eyebrow">TIẾN ĐỘ CỦA BẠN</span><h1>Mỗi ngày một chút, tiến bộ thật nhiều</h1><p>Nhìn lại hành trình học tập trong tuần này.</p>
      <div className="stat-cards">{stats.map(({ label, value, icon: Icon }) => <div key={label}><span><Icon size={22} /></span><small>{label}</small><b>{value}</b></div>)}</div>
      <div className="chart-card"><div><h2>Hoạt động trong tuần</h2><p>Phút học mỗi ngày</p></div><div className="bar-chart">{[35, 62, 45, 82, 58, 95, 72].map((h, i) => <div key={i}><span style={{ height: `${h}%` }} /><small>{['T2','T3','T4','T5','T6','T7','CN'][i]}</small></div>)}</div></div>
    </section>
  )
}

function AwardsView({ completed }) {
  const awards = [{ icon: '🔥', title: 'Bền bỉ 7 ngày', text: 'Học liên tục trong một tuần', won: true }, { icon: '🧠', title: 'Nhà thám hiểm AI', text: 'Hoàn thành chương AI là gì?', won: completed }, { icon: '🔍', title: 'Thám tử dữ liệu', text: 'Tìm ra 10 lỗi trong dữ liệu', won: false }, { icon: '🛡️', title: 'Công dân số', text: 'Hoàn thành chương AI có trách nhiệm', won: false }]
  return <section className="inner-page"><span className="eyebrow">BỘ SƯU TẬP</span><h1>Thành tích của bạn</h1><p>Mỗi huy hiệu đánh dấu một cột mốc đáng nhớ.</p><div className="awards-grid">{awards.map(a => <div className={a.won ? 'award won' : 'award'} key={a.title}><span>{a.icon}</span><h3>{a.title}</h3><p>{a.text}</p>{a.won ? <b><Check size={15} /> Đã đạt</b> : <small><Lock size={14} /> Chưa mở khóa</small>}</div>)}</div></section>
}

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('aiventure-user')) } catch { return null }
  })
  const [authMode, setAuthMode] = useState(null)

  function signIn(data) {
    localStorage.setItem('aiventure-user', JSON.stringify(data))
    setUser(data)
    setAuthMode(null)
  }

  function logout() {
    localStorage.removeItem('aiventure-user')
    setUser(null)
  }

  return (
    <>
      {user ? <Dashboard user={user} onLogout={logout} /> : <Landing onAuth={setAuthMode} />}
      {authMode && <AuthModal initialMode={authMode} onClose={() => setAuthMode(null)} onSuccess={signIn} />}
    </>
  )
}
