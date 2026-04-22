import React from "react";
import VulnerableAppLogo from "../images/Logo.png";

import {
  Header as RSuiteHeader,
  Navbar as RSuiteNavBar,
  Nav as RSuiteNav,
  Icon as RSuiteIcon,
  Dropdown as RSuiteDropDown,
} from "rsuite";

import { Props } from "../interface/Props";
import "../styles/Header.css";

interface HeaderState {
  isScannerDropdownOpen: boolean;
  dropdownTop: number;
  dropdownRight: number;
}

export default class Header extends React.Component<Props, HeaderState> {
  private dropdownRef = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);
    this.state = {
      isScannerDropdownOpen: false,
      dropdownTop: 0,
      dropdownRight: 0,
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    if (this.state.isScannerDropdownOpen) {
      this.setState({ isScannerDropdownOpen: false });
    }
  };

  handleClickOutside = (event: MouseEvent) => {
    if (
      this.dropdownRef.current &&
      !this.dropdownRef.current.contains(event.target as Node)
    ) {
      this.setState({ isScannerDropdownOpen: false });
    }
  };

  private isChallengeAvailable = (): boolean => {
    const { globalState } = this.props;
    const {
      activeApplication,
      applicationData,
      activeVulnerability,
      activeLevel,
    } = globalState;

    if (!applicationData) return false;

    const app = applicationData.find(
      (a: any) => a.applicationName === activeApplication
    );
    if (!app) return false;

    const vuln = app.vulnerabilityDefinitions?.find(
      (v: any) => v.id === activeVulnerability
    );
    if (!vuln) return false;

    const level = vuln.levels?.find(
      (l: any) => l.levelIdentifier === activeLevel
    );
    if (!level) return false;

    const challengeCards =
      level.challengeCards || (level.challenge ? [level.challenge] : []);
    return challengeCards.length > 0;
  };

  render() {
    const { globalState, setGlobalState } = this.props;
    const { isScannerDropdownOpen, dropdownTop, dropdownRight } = this.state;

    const isOnLevelPage = !!(
      globalState.activeApplication &&
      globalState.activeVulnerability &&
      globalState.activeLevel &&
      !globalState.activateHomePage &&
      !globalState.activateAboutUsPage
    );

    const challengeAvailable = isOnLevelPage
      ? this.isChallengeAvailable()
      : false;
    const isChallengeDisabled = isOnLevelPage && !challengeAvailable;

    const effectiveMode =
      globalState.isChallengeModeEnabled && !isChallengeDisabled
        ? "challenge"
        : "scanner";

    return (
      <div style={{ position: "relative", zIndex: 9999 }}>
        <RSuiteHeader>
          <RSuiteNavBar appearance="inverse">
            <RSuiteNavBar.Header>
              <img src={VulnerableAppLogo} width="55" height="55" alt="logo" />
            </RSuiteNavBar.Header>

            <RSuiteNavBar.Body>
              <RSuiteNav>
                <RSuiteNav.Item
                  onSelect={() =>
                    setGlobalState({
                      ...globalState,
                      activateHomePage: true,
                      activateAboutUsPage: false,
                    })
                  }
                >
                  <b>Owasp VulnerableApp-Facade</b>
                </RSuiteNav.Item>
              </RSuiteNav>

              <RSuiteNav pullRight>
                <RSuiteNav.Item style={{ padding: "0 5px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        borderRadius: "6px",
                        border: "1px solid rgba(255,255,255,0.4)",
                        height: "36px",
                      }}
                    >
                      {/* Challenge Mode */}
                      <button
                        disabled={isChallengeDisabled}
                        onClick={() =>
                          setGlobalState({
                            ...globalState,
                            isChallengeModeEnabled: true,
                          })
                        }
                        style={{
                          padding: "0 16px",
                          border: "none",
                          background:
                            effectiveMode === "challenge"
                              ? "#fc7303"
                              : "transparent",
                          color:
                            effectiveMode === "challenge" ? "#fff" : "#fff",
                          cursor: isChallengeDisabled
                            ? "not-allowed"
                            : "pointer",
                          opacity: isChallengeDisabled ? 0.5 : 1,
                          borderRadius: "6px 0 0 6px",
                          transition: "all 0.2s",
                        }}
                      >
                        Challenge Mode
                      </button>

                      {/* Custom Scanner Mode Dropdown Container */}
                      <div ref={this.dropdownRef} style={{ display: "flex" }}>
                        <button
                          onClick={() => {
                            if (this.dropdownRef.current) {
                              const rect =
                                this.dropdownRef.current.getBoundingClientRect();
                              this.setState((prevState) => ({
                                dropdownTop: rect.bottom + 5, 
                                dropdownRight: window.innerWidth - rect.right, 
                              }));
                            }

                            setGlobalState({
                              ...globalState,
                              isChallengeModeEnabled: false,
                            });
                          }}
                          style={{
                            padding: "0 16px",
                            border: "none",
                            borderLeft: "1px solid rgba(255,255,255,0.4)",
                            background:
                              effectiveMode === "scanner"
                                ? "#fc7303"
                                : "transparent",
                            color:
                              effectiveMode === "scanner" ? "#fff" : "#fff",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "0 6px 6px 0",
                            transition: "all 0.2s",
                          }}
                        >
                          Scanner Mode |
                          <span
                            style={{
                              marginTop: "4px",
                              marginLeft: "12px",
                              fontSize: "10px",
                            }}
                          >
                            <button
                              onClick={() => {
                                this.setState((prevState) => ({
                                  isScannerDropdownOpen:
                                    !prevState.isScannerDropdownOpen,
                                }));
                              }}
                              style={{
                                background:
                                  effectiveMode === "scanner"
                                    ? "#fc7303"
                                    : "transparent",
                                padding: "9px",
                              }}
                            >
                              ▼
                            </button>
                          </span>
                        </button>

                        {/* Dropdown Menu (Fixed, but positioned dynamically!) */}
                        {isScannerDropdownOpen && (
                          <div
                            style={{
                              position: "fixed",
                              top: `${dropdownTop}px`, // Dynamic Y coordinate
                              right: `${dropdownRight}px`, // Dynamic X coordinate
                              backgroundColor: "#fff",
                              borderRadius: "4px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                              minWidth: "150px",
                              zIndex: 9999999,
                              display: "flex",
                              flexDirection: "column",
                              border: "1px solid #ddd",
                            }}
                          >
                            <a
                              href="/scanner/dast"
                              style={{
                                padding: "10px 16px",
                                textDecoration: "none",
                                color: "#333",
                                fontSize: "14px",
                                borderBottom: "1px solid #eee",
                                display: "block",
                                cursor: "pointer",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "#f5f5f5")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "#fff")
                              }
                            >
                              DAST
                            </a>
                            <a
                              href="/scanner/sast"
                              style={{
                                padding: "10px 16px",
                                textDecoration: "none",
                                color: "#333",
                                fontSize: "14px",
                                display: "block",
                                cursor: "pointer",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "#f5f5f5")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "#fff")
                              }
                            >
                              SAST
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </RSuiteNav.Item>

                {/* Rest of Navigation */}
                <RSuiteNav.Item
                  icon={<RSuiteIcon icon="home" />}
                  onSelect={() =>
                    setGlobalState({
                      ...globalState,
                      activateHomePage: true,
                      activateAboutUsPage: false,
                    })
                  }
                >
                  Home
                </RSuiteNav.Item>
                <RSuiteNav.Item
                  onSelect={() =>
                    setGlobalState({
                      ...globalState,
                      activateHomePage: false,
                      activateAboutUsPage: true,
                    })
                  }
                >
                  About Us
                </RSuiteNav.Item>
                <RSuiteNav.Item
                  icon={<RSuiteIcon icon="github" />}
                  href="https://github.com/SasanLabs/VulnerableApp-facade"
                >
                  Github
                </RSuiteNav.Item>
                <RSuiteDropDown title="Projects by SasanLabs">
                  <RSuiteDropDown.Item
                    icon={<RSuiteIcon icon="github" />}
                    href="https://github.com/SasanLabs/VulnerableApp"
                  >
                    Owasp VulnerableApp
                  </RSuiteDropDown.Item>
                </RSuiteDropDown>
              </RSuiteNav>
            </RSuiteNavBar.Body>
          </RSuiteNavBar>
        </RSuiteHeader>
      </div>
    );
  }
}
