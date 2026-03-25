import { useState, useEffect, useRef } from "react";

const STEPS = [
  {
    key: "ロ",
    label: "論点",
    color: "#E8443A",
    hint: "そもそも何を答えるべき？\n「〜すべきか？」の形で書く",
    example: "例：新規事業Xに参入すべきか？",
    question: "この仕事のBIG QUESTIONは？",
  },
  {
    key: "サ",
    label: "サブ論点",
    color: "#E07B2E",
    hint: "論点を解くための「問い」に分解\n3〜5個がベスト",
    example: "例：市場規模は？/勝てるか？/儲かるか？",
    question: "論点の答えを出すには、何を検討すべき？",
  },
  {
    key: "T",
    label: "TASK",
    color: "#D4A72C",
    hint: "各サブ論点に答えるための\n具体的な作業を設計",
    example: "例：市場規模→業界レポート分析＋ヒアリング3件",
    question: "サブ論点に答えるために、何をやる？",
  },
  {
    key: "ス",
    label: "スケジュール",
    color: "#3BA55D",
    hint: "TASKの優先度・順番・期限を\n決めてWBSに落とす",
    example: "例：Day1-3 リサーチ → Day4-5 分析 → Day6 資料化",
    question: "いつまでに、誰が、どの順で？",
  },
  {
    key: "作",
    label: "作業",
    color: "#4A90D9",
    hint: "手を動かすフェーズ\nでも常に論点に立ち返る",
    example: "例：Excelで数値分析 → Wordで示唆まとめ",
    question: "ちゃんと論点に答える作業してる？",
  },
  {
    key: "ア",
    label: "アウトプット",
    color: "#7B68EE",
    hint: "最終成果物\n→ そのあと必ずD（議論）へ",
    example: "例：提案スライド10枚 → 上司とディスカッション",
    question: "論点にストレートに答えてる？",
  },
];

export default function RoSaTSuSaA() {
  const [activeStep, setActiveStep] = useState(null);
  const [notes, setNotes] = useState({});
  const [projectName, setProjectName] = useState("");
  const [showTip, setShowTip] = useState(true);
  const textareaRefs = useRef({});

  const handleNoteChange = (key, value) => {
    setNotes((prev) => ({ ...prev, [key]: value }));
  };

  const filledCount = Object.values(notes).filter((v) => v && v.trim()).length;
  const progress = (filledCount / 6) * 100;

  const handleExport = () => {
    let text = `# ${projectName || "無題のプロジェクト"}\n`;
    text += `# ロ→サ→T→ス→作→ア メモ\n`;
    text += `---\n\n`;
    STEPS.forEach((s) => {
      text += `## [${s.key}] ${s.label}\n`;
      text += `${notes[s.key] || "（未記入）"}\n\n`;
    });
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectName || "rosatsusakua"}-memo.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setNotes({});
    setProjectName("");
    setActiveStep(null);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#1a1a1e",
      color: "#e8e6e3",
      fontFamily: "'Noto Sans JP', 'Helvetica Neue', sans-serif",
      padding: "0",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&family=IBM+Plex+Mono:wght@400;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a1e 0%, #2a2a30 100%)",
        borderBottom: "1px solid #333",
        padding: "20px 24px 16px",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}>
          <div>
            <h1 style={{
              fontSize: "13px",
              fontWeight: 400,
              color: "#888",
              margin: 0,
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: "'IBM Plex Mono', monospace",
            }}>
              高松智史式
            </h1>
            <div style={{
              fontSize: "28px",
              fontWeight: 900,
              margin: "4px 0 0",
              letterSpacing: "6px",
              display: "flex",
              gap: "2px",
            }}>
              {STEPS.map((s) => (
                <span key={s.key} style={{
                  color: s.color,
                  textShadow: `0 0 20px ${s.color}33`,
                }}>
                  {s.key}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleExport}
              style={{
                background: "#333",
                border: "1px solid #555",
                color: "#ccc",
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "11px",
                cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              📋 Export
            </button>
            <button
              onClick={handleReset}
              style={{
                background: "#333",
                border: "1px solid #555",
                color: "#888",
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "11px",
                cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* Project Name */}
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="プロジェクト名をメモ..."
          style={{
            width: "100%",
            background: "#222",
            border: "1px solid #3a3a3a",
            borderRadius: "6px",
            padding: "8px 12px",
            color: "#e8e6e3",
            fontSize: "14px",
            fontFamily: "'Noto Sans JP', sans-serif",
            outline: "none",
            boxSizing: "border-box",
            marginBottom: "10px",
          }}
        />

        {/* Progress */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <div style={{
            flex: 1,
            height: "3px",
            background: "#333",
            borderRadius: "2px",
            overflow: "hidden",
          }}>
            <div style={{
              width: `${progress}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${STEPS.map(s => s.color).join(", ")})`,
              borderRadius: "2px",
              transition: "width 0.4s ease",
            }} />
          </div>
          <span style={{
            fontSize: "11px",
            color: "#666",
            fontFamily: "'IBM Plex Mono', monospace",
            whiteSpace: "nowrap",
          }}>
            {filledCount}/6
          </span>
        </div>
      </div>

      {/* Tip Banner */}
      {showTip && (
        <div style={{
          margin: "16px 16px 0",
          padding: "12px 16px",
          background: "#2a2520",
          border: "1px solid #4a3a20",
          borderRadius: "8px",
          fontSize: "12px",
          color: "#c8a860",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          lineHeight: 1.6,
        }}>
          <div>
            <strong>💡 核心：</strong>いきなりTASKに飛ばない。
            <br />「ロ→サ」= 論点とサブ論点を先に立てるだけで、仕事の質が激変する。
            <br />最後は必ず<strong> →D（ディスカッション）</strong>で上司と議論してプロセスを閉じる。
          </div>
          <button
            onClick={() => setShowTip(false)}
            style={{
              background: "none",
              border: "none",
              color: "#886830",
              cursor: "pointer",
              fontSize: "16px",
              padding: "0 0 0 12px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Flow Arrow */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px 16px 8px",
        gap: "4px",
        flexWrap: "wrap",
      }}>
        {STEPS.map((s, i) => (
          <div key={s.key} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <button
              onClick={() => setActiveStep(activeStep === s.key ? null : s.key)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: activeStep === s.key ? `2px solid ${s.color}` : "2px solid #444",
                background: activeStep === s.key ? `${s.color}22` : notes[s.key]?.trim() ? "#2a2a30" : "#222",
                color: notes[s.key]?.trim() ? s.color : activeStep === s.key ? s.color : "#666",
                fontSize: "16px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                fontFamily: "'Noto Sans JP', sans-serif",
                boxShadow: activeStep === s.key ? `0 0 16px ${s.color}33` : "none",
              }}
            >
              {s.key}
              {notes[s.key]?.trim() && (
                <div style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-2px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: s.color,
                }} />
              )}
            </button>
            {i < STEPS.length - 1 && (
              <span style={{ color: "#444", fontSize: "14px", fontFamily: "'IBM Plex Mono', monospace" }}>→</span>
            )}
          </div>
        ))}
        <span style={{ color: "#444", fontSize: "14px", fontFamily: "'IBM Plex Mono', monospace", marginLeft: "4px" }}>→</span>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "2px dashed #555",
          background: "#222",
          color: "#666",
          fontSize: "16px",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Noto Sans JP', sans-serif",
        }}>
          D
        </div>
      </div>
      <div style={{
        textAlign: "center",
        fontSize: "10px",
        color: "#555",
        fontFamily: "'IBM Plex Mono', monospace",
        marginBottom: "8px",
      }}>
        タップして展開 → メモを記入
      </div>

      {/* Step Cards */}
      <div style={{ padding: "8px 16px 100px" }}>
        {STEPS.map((s, i) => {
          const isActive = activeStep === s.key;
          const hasContent = notes[s.key]?.trim();

          return (
            <div
              key={s.key}
              style={{
                marginBottom: "8px",
                borderRadius: "10px",
                border: `1px solid ${isActive ? s.color + "66" : "#333"}`,
                background: isActive ? "#222228" : "#1e1e22",
                overflow: "hidden",
                transition: "all 0.3s ease",
                boxShadow: isActive ? `0 4px 24px ${s.color}11` : "none",
              }}
            >
              {/* Card Header */}
              <button
                onClick={() => setActiveStep(isActive ? null : s.key)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{
                  fontSize: "20px",
                  fontWeight: 900,
                  color: s.color,
                  fontFamily: "'Noto Sans JP', sans-serif",
                  minWidth: "28px",
                  textShadow: isActive ? `0 0 12px ${s.color}44` : "none",
                }}>
                  {s.key}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#e8e6e3",
                    fontFamily: "'Noto Sans JP', sans-serif",
                  }}>
                    {s.label}
                  </div>
                  <div style={{
                    fontSize: "11px",
                    color: "#777",
                    fontFamily: "'Noto Sans JP', sans-serif",
                    marginTop: "2px",
                  }}>
                    {s.question}
                  </div>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}>
                  {hasContent && (
                    <div style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: s.color,
                    }} />
                  )}
                  <span style={{
                    color: "#555",
                    fontSize: "16px",
                    transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}>
                    ▾
                  </span>
                </div>
              </button>

              {/* Card Body */}
              {isActive && (
                <div style={{
                  padding: "0 16px 16px",
                }}>
                  {/* Hint */}
                  <div style={{
                    padding: "10px 12px",
                    background: `${s.color}0a`,
                    border: `1px solid ${s.color}22`,
                    borderRadius: "6px",
                    marginBottom: "10px",
                  }}>
                    <div style={{
                      fontSize: "12px",
                      color: "#999",
                      whiteSpace: "pre-line",
                      lineHeight: 1.6,
                      fontFamily: "'Noto Sans JP', sans-serif",
                    }}>
                      {s.hint}
                    </div>
                    <div style={{
                      fontSize: "11px",
                      color: s.color,
                      marginTop: "6px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      opacity: 0.7,
                    }}>
                      {s.example}
                    </div>
                  </div>

                  {/* Textarea */}
                  <textarea
                    ref={(el) => (textareaRefs.current[s.key] = el)}
                    value={notes[s.key] || ""}
                    onChange={(e) => handleNoteChange(s.key, e.target.value)}
                    placeholder={`${s.label}をメモ...`}
                    style={{
                      width: "100%",
                      minHeight: "100px",
                      background: "#1a1a1e",
                      border: `1px solid ${s.color}33`,
                      borderRadius: "6px",
                      padding: "12px",
                      color: "#e8e6e3",
                      fontSize: "13px",
                      fontFamily: "'Noto Sans JP', sans-serif",
                      lineHeight: 1.8,
                      outline: "none",
                      resize: "vertical",
                      boxSizing: "border-box",
                    }}
                    autoFocus
                  />

                  {/* Nav */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "8px",
                  }}>
                    {i > 0 ? (
                      <button
                        onClick={() => setActiveStep(STEPS[i - 1].key)}
                        style={{
                          background: "none",
                          border: "1px solid #444",
                          color: "#888",
                          padding: "6px 14px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          cursor: "pointer",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        ← {STEPS[i - 1].key}
                      </button>
                    ) : <div />}
                    {i < STEPS.length - 1 && (
                      <button
                        onClick={() => setActiveStep(STEPS[i + 1].key)}
                        style={{
                          background: `${STEPS[i + 1].color}22`,
                          border: `1px solid ${STEPS[i + 1].color}44`,
                          color: STEPS[i + 1].color,
                          padding: "6px 14px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          cursor: "pointer",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        {STEPS[i + 1].key} →
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Warning Card */}
        <div style={{
          marginTop: "16px",
          padding: "16px",
          background: "#1c1416",
          border: "1px solid #3a2028",
          borderRadius: "10px",
        }}>
          <div style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#E8443A",
            marginBottom: "8px",
            fontFamily: "'Noto Sans JP', sans-serif",
          }}>
            ⚠ TASKバカ注意報
          </div>
          <div style={{
            fontSize: "12px",
            color: "#999",
            lineHeight: 1.8,
            fontFamily: "'Noto Sans JP', sans-serif",
          }}>
            いきなり「T（TASK）」から始めていないか？
            <br />
            <span style={{ color: "#E8443A" }}>ロ→サ</span> を飛ばすと、
            論点がズレた作業を大量にこなす「TASKバカ」になる。
            <br />
            <strong style={{ color: "#c8a860" }}>まず論点。常に論点に立ち返る。</strong>
          </div>
        </div>

        {/* Checklist */}
        <div style={{
          marginTop: "12px",
          padding: "16px",
          background: "#161820",
          border: "1px solid #252840",
          borderRadius: "10px",
        }}>
          <div style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#7B68EE",
            marginBottom: "10px",
            fontFamily: "'Noto Sans JP', sans-serif",
          }}>
            🔍 セルフチェック
          </div>
          {[
            "論点は「〜すべきか？」の形になってる？",
            "サブ論点は論点の「答え」を作れる問いになってる？",
            "TASKはサブ論点に紐づいてる？宙ぶらりんのTASKない？",
            "アウトプットは論点にストレートに答えてる？",
            "最後にD（ディスカッション）ちゃんとやった？",
          ].map((q, i) => (
            <div key={i} style={{
              fontSize: "12px",
              color: "#888",
              padding: "6px 0",
              borderBottom: i < 4 ? "1px solid #252840" : "none",
              fontFamily: "'Noto Sans JP', sans-serif",
              lineHeight: 1.6,
            }}>
              <span style={{ color: "#555", marginRight: "8px" }}>□</span>
              {q}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
