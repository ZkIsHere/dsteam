import { useState } from "react";
import { ArrowDown, ArrowRight, Code2, Layers3 } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import projects from "@/data/projects.json";
import { Meteors } from "@/lib/meteors";
import { MusicPlayer } from "@/components/music-player";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "xBuuzz.CMD — DEVELOPER" },
      {
        name: "description",
        content: "Khám phá các dự án máy chủ FiveM GTA V và hành trình phát triển của xBuuzz.CMD.",
      },
      { property: "og:title", content: "xBuuzz.CMD — Portfolio FiveM GTA V" },
      {
        property: "og:description",
        content: "Khám phá các dự án máy chủ FiveM GTA V và hành trình phát triển của xBuuzz.CMD.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

const technologies = [
  { name: "Lua", detail: "Phát triển script FiveM." },
  { name: "JavaScript", detail: "Xây dựng trải nghiệm tương tác." },
  { name: "HTML / CSS", detail: "Thiết kế giao diện cho máy chủ." },
  { name: "NUI", detail: "Giao diện trong game FiveM." },
  { name: "Cơ sở dữ liệu", detail: "Tài nguyên ổn định, dễ tùy biến." },
];

function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<"projects" | "technology">("projects");

  return (
    <>
      <div className="top-music-bar">
        <div className="icloud-player">
          <MusicPlayer />
        </div>
      </div>
      <main className="relative portfolio-shell">
      <Meteors number={30} />
      <header className="site-header">
        <a aria-label="xBuuzz.CMD — đầu trang" className="wordmark" href="#Home">
          <img
            src="/lgchu1.svg"
            alt="xBuuzz.DEVELOPER"
            style={{ height: "100px", width: "auto", filter: "invert(1)" }}
          />
        </a>
        <nav aria-label="Điều hướng chính" className="main-nav">
          <a href="#Home">Trang chủ</a>
          <a href="#About">Giới thiệu</a>
          <a className="nav-active" href="#Portfolio">
            Dự án
          </a>
        </nav>
        <div className="right-controls">
          <a className="nav-index" href="#Portfolio" aria-label="Đi đến các dự án">
            01 <span>/</span> 03
          </a>
        </div>
      </header>

      <section aria-labelledby="hero-title" className="intro-section" id="Home">
        <div className="intro-copy">
          <p className="eyebrow">
            <span className="status-dot" /> From DS TEAM WITH LOVE ✨
          </p>
          <h1 id="hero-title">
            WELCOME TO,
            <br />
            <span>DS DEVELOPER.</span>
          </h1>
          <p className="intro-description">
            Chào mừng mọi người đã đến DS TEAM, mình là xBuuzz.CMD .
            đội ngũ phát triển script FiveM được thành lập bởi những người đam mê GTA V Roleplay tại Việt Nam. Từ những dòng code đầu tiên cho đến hàng trăm resource đã release, chúng tôi luôn theo đuổi một mục tiêu duy nhất: mang đến trải nghiệm roleplay sâu sắc và mượt mà cho cộng đồng.
          </p>
          <div className="intro-actions">
            <Button asChild className="project-cta">
              <a href="#Portfolio">
                Xem dự án <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <a className="scroll-link" href="#About">
              <ArrowDown aria-hidden="true" /> <span>CUỘN ĐỂ KHÁM PHÁ</span>
            </a>
          </div>
        </div>
        <div aria-hidden="true" className="intro-art-wrap">
          <span className="intro-art-index">DS TEAM / 2024—2027</span>
          <img className="intro-art" src="/projects/lgds.png" />
          <span className="intro-art-caption">
            CREATIVE SYSTEMS
            <br />
            FIVEM ROLEPLAY
          </span>
        </div>
        <a className="hero-side-note" href="#Portfolio">
          <span className="hero-side-rule" />
          FROM DS TEAM WITH LOVE
        </a>
        <span aria-hidden="true" className="hero-index">
          01 <i>—</i> 03
        </span>
      </section>

      <section aria-labelledby="about-title" className="about-section" id="About">
        <div className="section-label">
          <span className="section-number">01</span>
          <span>VÀI DÒNG VỀ TÔI</span>
        </div>
        <div className="about-layout">
          <div className="portrait-wrap">
            <div aria-hidden="true" className="portrait-orbit" />
            <img
              alt="Minh họa xBuuzz.CMD"
              className="portrait-image"
              src="/projects/xbuuzz.png"
            />
            <div className="portrait-caption">
              <span className="status-dot" /> xBuuzz.CMD
            </div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">
              <span className="status-dot" /> CÂU CHUYỆN CỦA TÔI
            </p>
            <h2 id="about-title">
              Xin chào,
              <br />
              mình là <span>xBuuzz.CMD.</span>
            </h2>
            <p>
              Developer tập trung vào phát triển hệ thống, script và giao diện cho FiveM GTA V. Mình
              sử dụng Lua, JavaScript, HTML/CSS, NUI và cơ sở dữ liệu để tạo nên những tài nguyên
              tối ưu, ổn định và dễ tùy biến.
            </p>
            <a className="text-link" href="#Portfolio">
              Xem những dự án mình đã tham gia <ArrowRight aria-hidden="true" />
            </a>
            <div className="about-meta">
              <span>FIVEM / GTA V</span>
              <span>LUA · JAVASCRIPT · NUI</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="portfolio-title" className="portfolio-section" id="Portfolio">
        <div className="section-label">
          <span className="section-number">02</span>
          <span>HÀNH TRÌNH CỦA TÔI</span>
        </div>
        <div className="portfolio-heading">
          <div>
            <p className="eyebrow">
              <span className="status-dot" /> TỪNG BƯỚC MỘT DẤU ẤN
            </p>
            <h2 id="portfolio-title">
              Những dự án
              <br />
              đã tham gia.
            </h2>
            <p className="section-description">Mỗi bước đều là một phần của hành trình.</p>
          </div>
          <div aria-label="Lọc nội dung" className="portfolio-tabs" role="group">
            <Button
              aria-pressed={activeTab === "projects"}
              className="portfolio-tab"
              onClick={() => setActiveTab("projects")}
              variant={activeTab === "projects" ? "default" : "ghost"}
            >
              <Code2 aria-hidden="true" /> Dự án
            </Button>
            <Button
              aria-pressed={activeTab === "technology"}
              className="portfolio-tab"
              onClick={() => setActiveTab("technology")}
              variant={activeTab === "technology" ? "default" : "ghost"}
            >
              <Layers3 aria-hidden="true" /> Công nghệ
            </Button>
          </div>
        </div>

        {activeTab === "projects" ? (
          <div className="project-grid">
            {projects.map((project) => (
              <article
                className="project-card"
                key={project.number}
                onClick={() => project.discord && window.open(project.discord, "_blank")}
                style={{ cursor: project.discord ? "pointer" : "default" }}
              >
                <div className="project-art">
                  <img
                    alt={project.name}
                    loading="lazy"
                    src={project.image}
                    className={
                      project.status === "SẮP RA MẮT" || project.status === "CHUẨN BỊ MỞ CỬA"
                        ? "status-upcoming"
                        : project.status === "ĐÃ ĐÓNG CỬA"
                        ? "status-closed"
                        : ""
                    }
                  />
                  <span className="project-number">{project.number}</span>
                </div>
                <div className="project-info">
                  <p className="project-category">
                    MÁY CHỦ FIVEM <span>— GTA V</span>
                  </p>
                  <h3 className="project-title-with-icon">
                    {project.name}
                    {project.discord && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`project-discord-icon${
                          project.status === "SẮP RA MẮT" || project.status === "CHUẨN BỊ MỞ CỬA"
                            ? " status-upcoming"
                            : project.status === "ĐÃ ĐÓNG CỬA"
                            ? " status-closed"
                            : ""
                        }`}
                        aria-label="Discord"
                      >
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                    )}
                  </h3>
                  <p className="project-description">{project.description}</p>
                  <span
                    className={`project-status${project.status === "SẮP RA MẮT" || project.status === "CHUẨN BỊ MỞ CỬA" ? " upcoming" : ""}`}
                  >
                    <span className="status-dot" /> {project.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="technology-grid">
            {technologies.map((technology, index) => (
              <article className="technology-item" key={technology.name}>
                <span className="technology-number">0{index + 1}</span>
                <h3>{technology.name}</h3>
                <p>{technology.detail}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section aria-labelledby="contact-title" className="contact-section" id="Contact">
        <div className="contact-copy">
          <div className="section-label">
            <span className="section-number">03</span>
            <span>LIÊN HỆ / CONTACT</span>
          </div>
          <p className="eyebrow">
            <span className="status-dot" /> Ý TƯỞNG TIẾP THEO BẮT ĐẦU TỪ ĐÂY
          </p>
          <h2 id="contact-title">
            Cùng xây dựng
            <br />
            dự án <span>FiveM</span> tiếp theo?
          </h2>
          <p className="contact-description">
            Muốn hợp tác, trao đổi ý tưởng hoặc cần hỗ trợ phát triển server GTA V? Hãy kết nối với
            xBuuzz.CMD.
          </p>
          <Button asChild className="project-cta">
            <a href="https://discord.gg/K8cPgFWHxP" rel="noreferrer" target="_blank">
              Liên hệ qua Discord <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </div>
        <footer className="site-footer">
          <a aria-label="xBuuzz.CMD — đầu trang" className="wordmark" href="#Home">
            xBuuzz<span>.</span>CMD
          </a>
          <span>FIVEM / GTA V</span>
          <a href="#Home">TRỞ VỀ ĐẦU TRANG ↑</a>
        </footer>
      </section>
    </main>
    </>
  );
}
