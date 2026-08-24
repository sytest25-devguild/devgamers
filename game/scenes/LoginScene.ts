import Phaser from "phaser";

export default class LoginScene extends Phaser.Scene {
  private brandText?: Phaser.GameObjects.Text;
  private panel?: Phaser.GameObjects.Container;
  private loginForm?: Phaser.GameObjects.DOMElement;
  private statusText?: Phaser.GameObjects.Text;
  private formSubmitHandler?: (event: SubmitEvent) => void;
  private backClickHandler?: (event: MouseEvent) => void;
  private registerClickHandler?: (event: MouseEvent) => void;

  constructor() {
    super("LoginScene");
  }
  preload() {
    this.load.image("logo", "/logo.png");
  }
  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;
    this.add.image(centerX, centerY, "logo");
    this.brandText = this.add
      .text(centerX, 80, "DevGuild", {
        fontSize: "44px",
        color: "#ffffff",
        fontFamily: "Arial",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.panel = this.add.container(centerX, centerY);

    const panelBg = this.add.rectangle(0, 0, 420, 430, 0x111827, 0.95);
    panelBg.setStrokeStyle(2, 0x334155, 1);

    const title = this.add
      .text(0, -145, "Login", {
        fontSize: "34px",
        color: "#f8fafc",
        fontFamily: "Arial",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.statusText = this.add
      .text(0, 235, "", {
        fontSize: "16px",
        color: "#86efac",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    this.panel.add([panelBg, title, this.statusText]);

    const loginMarkup = `
      <form class="login-form" id="login-form">
        <label for="username">Username</label>
        <input id="username" name="username" type="text" placeholder="demo@devguild.com" autocomplete="username" required />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" placeholder="Password" autocomplete="current-password" required />
        <button type="submit">Sign In</button>
        <button id="back-home" type="button" class="secondary">Back to landing</button>
        <button id="go-to-register" type="button" class="secondary">Register here</button>
      </form>
    `;

    this.loginForm = this.add
      .dom(centerX, centerY + 35)
      .createFromHTML(loginMarkup);
    const formNode = this.loginForm.node as HTMLFormElement | null;
    const backButton = formNode?.querySelector(
      "#back-home",
    ) as HTMLButtonElement | null;

    this.formSubmitHandler = (event: SubmitEvent) => {
      event.preventDefault();

      const usernameInput = formNode?.querySelector(
        "#username",
      ) as HTMLInputElement | null;
      const username = usernameInput?.value?.trim() ?? "";

      if (username.length > 0) {
        this.statusText?.setText(`Signed in as ${username}`);
        window.dispatchEvent(
          new CustomEvent("phaser:navigate", {
            detail: { path: "/home" },
          }),
        );
      } else {
        this.statusText?.setText("Please enter username and password");
      }
    };

    this.backClickHandler = (event: MouseEvent) => {
      event.preventDefault();
      window.dispatchEvent(
        new CustomEvent("phaser:navigate", {
          detail: { path: "/" },
        }),
      );
    };

    const registerButton = formNode?.querySelector(
      "#go-to-register",
    ) as HTMLButtonElement | null;

    this.registerClickHandler = (event: MouseEvent) => {
      event.preventDefault();
      window.dispatchEvent(
        new CustomEvent("phaser:navigate", {
          detail: { path: "/create-account" },
        }),
      );
    };

    formNode?.addEventListener("submit", this.formSubmitHandler);
    backButton?.addEventListener("click", this.backClickHandler);
    registerButton?.addEventListener("click", this.registerClickHandler);

    this.updateLayout(this.scale.width, this.scale.height);

    this.scale.on("resize", this.handleResize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      formNode?.removeEventListener(
        "submit",
        this.formSubmitHandler as EventListener,
      );
      backButton?.removeEventListener(
        "click",
        this.backClickHandler as EventListener,
      );
      registerButton?.removeEventListener(
        "click",
        this.registerClickHandler as EventListener,
      );

      this.loginForm?.destroy();
      this.scale.off("resize", this.handleResize, this);
    });
  }

  private handleResize(gameSize: Phaser.Structs.Size) {
    this.updateLayout(gameSize.width, gameSize.height);
  }

  private updateLayout(width: number, height: number) {
    const centerX = width / 2;
    const centerY = height / 2;

    const brandY = Phaser.Math.Clamp(height * 0.12, 36, 92);
    const brandSize = Phaser.Math.Clamp(Math.round(width * 0.085), 24, 44);
    this.brandText?.setFontSize(brandSize);
    this.brandText?.setPosition(centerX, brandY);

    this.panel?.setPosition(centerX, centerY);
    this.loginForm?.setPosition(centerX, centerY + 35);
  }
}
