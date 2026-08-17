import Phaser from "phaser";

export default class LandingScene extends Phaser.Scene {
  private logo?: Phaser.GameObjects.Sprite;
  private titleText?: Phaser.GameObjects.Text;
  private logoBaseScale = 0.5;

  constructor() {
    super("LandingScene");
  }

  preload() {
    this.load.image("logo", "/logo.png")
  }
  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    this.logo = this.add.sprite(centerX, centerY, "logo");
    this.logo.setOrigin(0.5);
    this.logo.setScale(this.logoBaseScale);
    this.logo.setInteractive({ cursor: "pointer" });
    this.logo.on("pointerdown", () => {
      window.dispatchEvent(
        new CustomEvent("phaser:navigate", {
          detail: { path: "/login" },
        }),
      );
    });
    this.logo.on("pointerover", () => {
      this.logo?.setScale(this.logoBaseScale * 1.02);
    });
    this.logo.on("pointerout", () => {
      this.logo?.setScale(this.logoBaseScale);
    });

    // this.titleText = this.add.text(centerX, centerY + 150, "DevGuild", {
    //   fontSize: "40px",
    //   color: "#ffffff",
    //   fontFamily: "Arial",
    // });

    // this.titleText.setOrigin(0.5);
    // this.updateLayout(this.scale.width, this.scale.height);

    this.scale.on("resize", this.handleResize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off("resize", this.handleResize, this);
    });
  }

  private handleResize(gameSize: Phaser.Structs.Size) {
    this.updateLayout(gameSize.width, gameSize.height);
  }

  private updateLayout(width: number, height: number) {
    const centerX = width / 2;
    const logoY = Phaser.Math.Clamp(height * 0.38, 100, height * 0.5);

    this.logoBaseScale = Phaser.Math.Clamp(
      Math.min(width / 1200, height / 900) * 0.5,
      0.22,
      0.5,
    );

    this.logo?.setPosition(centerX, logoY);
    this.logo?.setScale(this.logoBaseScale);

    const titleFontSize = Phaser.Math.Clamp(Math.round(width * 0.075), 24, 40);
    this.titleText?.setFontSize(titleFontSize);

    const logoBottomY = logoY + (this.logo?.displayHeight ?? 0) / 2;
    const titleY = Phaser.Math.Clamp(logoBottomY + 42, 40, height - 24);

    this.titleText?.setPosition(centerX, titleY);
  }
}
