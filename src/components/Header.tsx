import logo from "@/assets/logo.png";

export const Header = () => {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center gap-3">
          <img src={logo} alt="Sparkles Amplified" className="h-16 w-auto" />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Sparkles Amplified Cleaning Services</h1>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground mt-1">
              <span>Email: amplifiedsparkles@gmail.com</span>
              <span className="hidden sm:inline">|</span>
              <span>Phone: +1 443 557 8099</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
