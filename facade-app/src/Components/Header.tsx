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

export default class Header extends React.Component<Props, {}> {
  
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
              <img
                src={VulnerableAppLogo}
                width="55"
                height="55"
                alt="vulnerable app logo"
              />
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
                          color: "#fff",
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

                      {/* Scanner Mode (Dropdown logic removed) */}
                      <button
                        onClick={() =>
                          setGlobalState({
                            ...globalState,
                            isChallengeModeEnabled: false,
                          })
                        }
                        style={{
                          padding: "0 16px",
                          border: "none",
                          borderLeft: "1px solid rgba(255,255,255,0.4)",
                          background:
                            effectiveMode === "scanner"
                              ? "#fc7303"
                              : "transparent",
                          color: "#fff",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "0 6px 6px 0",
                          transition: "all 0.2s",
                        }}
                      >
                        Scanner Mode
                      </button>
                    </div>
                  </div>
                </RSuiteNav.Item>

                <RSuiteNav.Item
                  onSelect={() =>
                    setGlobalState({
                      ...globalState,
                      activateHomePage: true,
                      activateAboutUsPage: false,
                    })
                  }
                  icon={<RSuiteIcon icon="home" role={"img"} />}
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

                {/* Restored Original Scanners Dropdown */}
                <RSuiteDropDown title="Scanners">
                  <a href="../scanner/dast">
                    <RSuiteDropDown.Item title="Dynamic Application Security Testing">
                      DAST
                    </RSuiteDropDown.Item>
                  </a>
                  <a href="../scanner/sast">
                    <RSuiteDropDown.Item title="Static Application Security Testing">
                      SAST
                    </RSuiteDropDown.Item>
                  </a>
                </RSuiteDropDown>

                <a href="https://github.com/SasanLabs/VulnerableApp-facade">
                  <RSuiteNav.Item
                    icon={<RSuiteIcon icon="github" role={"img"} />}
                  >
                    Github
                  </RSuiteNav.Item>
                </a>

                {/* Restored Original Projects Dropdown */}
                <RSuiteDropDown title="Projects by SasanLabs">
                  <a href="https://github.com/SasanLabs/VulnerableApp">
                    <RSuiteDropDown.Item
                      icon={<RSuiteIcon icon="github" role={"img"} />}
                    >
                      Owasp VulnerableApp
                    </RSuiteDropDown.Item>
                  </a>
                  <a href="https://github.com/SasanLabs/LLMForge">
                    <RSuiteDropDown.Item
                      icon={<RSuiteIcon icon="github" role={"img"} />}
                    >
                      LLMForge
                    </RSuiteDropDown.Item>
                  </a>
                  <a href="https://github.com/SasanLabs/SAFE">
                    <RSuiteDropDown.Item
                      icon={<RSuiteIcon icon="github" role={"img"} />}
                    >
                      Security Awareness for Everyone
                    </RSuiteDropDown.Item>
                  </a>
                  <a href="https://github.com/SasanLabs/owasp-zap-jwt-addon">
                    {" "}
                    <RSuiteDropDown.Item
                      icon={<RSuiteIcon icon="github" role={"img"} />}
                    >
                      ZAP JWT Addon
                    </RSuiteDropDown.Item>
                  </a>
                  <a href="https://github.com/SasanLabs/owasp-zap-fileupload-addon">
                    <RSuiteDropDown.Item
                      icon={<RSuiteIcon icon="github" role={"img"} />}
                    >
                      ZAP FileUpload Addon
                    </RSuiteDropDown.Item>
                  </a>
                </RSuiteDropDown>
              </RSuiteNav>
            </RSuiteNavBar.Body>
          </RSuiteNavBar>
        </RSuiteHeader>
      </div>
    );
  }
}