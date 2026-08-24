import Phaser from "phaser";

export default class CreateAccountScene extends Phaser.Scene {
  private brandText?: Phaser.GameObjects.Text;
  private panel?: Phaser.GameObjects.Container;
  private accountForm?: Phaser.GameObjects.DOMElement;
  private statusText?: Phaser.GameObjects.Text;
  private formSubmitHandler?: (event: SubmitEvent) => void;
  private backClickHandler?: (event: MouseEvent) => void;

  constructor() {
    super("CreateAccountScene");
  }

  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    this.brandText = this.add.text(centerX, 80, "DevGuild", {
      fontSize: "44px",
      color: "#ffffff",
      fontFamily: "Arial",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.panel = this.add.container(centerX, centerY);

    const panelBg = this.add.rectangle(0, 0, 420, 560, 0x111827, 0.95);
    panelBg.setStrokeStyle(2, 0x334155, 1);

    const title = this.add.text(0, -250, "Create Account", {
      fontSize: "34px",
      color: "#f8fafc",
      fontFamily: "Arial",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.statusText = this.add.text(0, 265, "", {
      fontSize: "16px",
      color: "#86efac",
      fontFamily: "Arial",
    }).setOrigin(0.5);

    this.panel.add([panelBg, title, this.statusText]);

    const formMarkup = `
      <form class="login-form" id="create-account-form">
        <label for="username">Username</label>
        <input id="username" name="username" type="text" placeholder="yourname" autocomplete="username" required minlength="3" />
        <label for="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@devguild.com" autocomplete="email" required />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" placeholder="Password" autocomplete="new-password" required minlength="8" />
        <label for="confirm-password">Confirm password</label>
        <input id="confirm-password" name="confirm-password" type="password" placeholder="Confirm password" autocomplete="new-password" required />
        <button type="submit">Create Account</button>
        <button id="back-to-login" type="button" class="secondary">Back to login</button>
      </form>
    `;

    this.accountForm = this.add.dom(centerX, centerY + 10).createFromHTML(formMarkup);
    const formNode = this.accountForm.node as HTMLFormElement | null;
    const backButton = formNode?.querySelector("#back-to-login") as HTMLButtonElement | null;

    this.formSubmitHandler = (event: SubmitEvent) => {
      event.preventDefault();

      const usernameInput = formNode?.querySelector("#username") as HTMLInputElement | null;
      const emailInput = formNode?.querySelector("#email") as HTMLInputElement | null;
      const passwordInput = formNode?.querySelector("#password") as HTMLInputElement | null;
      const confirmInput = formNode?.querySelector("#confirm-password") as HTMLInputElement | null;

      const username = usernameInput?.value?.trim() ?? "";
      const email = emailInput?.value?.trim() ?? "";
      const password = passwordInput?.value ?? "";
      const confirmPassword = confirmInput?.value ?? "";

      if (username.length < 3) {
        this.statusText?.setText("Username must be at least 3 characters");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        this.statusText?.setText("Enter a valid email");
        return;
      }
      if (password.length < 8) {
        this.statusText?.setText("Password must be at least 8 characters");
        return;
      }
      if (password !== confirmPassword) {
        this.statusText?.setText("Passwords don't match");
        return;
      }

      this.statusText?.setText("Creating account...");

      registerUser({ username, email, password }).then((result) => {
        if (result.ok) {
          this.statusText?.setText("Account created! Redirecting...");
          window.setTimeout(() => {
            window.dispatchEvent(
              new CustomEvent("phaser:navigate", { detail: { path: "/login" } }),
            );
          }, 1000);
        } else {
          this.statusText?.setText(result.error ?? "Something went wrong");
        }
      });
    };

    this.backClickHandler = (event: MouseEvent) => {
      event.preventDefault();
      window.dispatchEvent(
        new CustomEvent("phaser:navigate", { detail: { path: "/login" } }),
      );
    };

    formNode?.addEventListener("submit", this.formSubmitHandler);
    backButton?.addEventListener("click", this.backClickHandler);

    this.updateLayout(this.scale.width, this.scale.height);

    this.scale.on("resize", this.handleResize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      formNode?.removeEventListener("submit", this.formSubmitHandler as EventListener);
      backButton?.removeEventListener("click", this.backClickHandler as EventListener);
      this.accountForm?.destroy();
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
    this.accountForm?.setPosition(centerX, centerY + 10);
  }
}

async function registerUser({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}): Promise<{ ok: boolean; error?: string }> {
  await new Promise((resolve) => window.setTimeout(resolve, 800));

  if (email === "taken@example.com") {
    return { ok: false, error: "Email already registered" };
  }

  return { ok: true };
}
