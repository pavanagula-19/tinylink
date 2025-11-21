export default function Footer() {
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-6 text-sm text-muted">
        © {new Date().getFullYear()} briefly — Built with TinyLink.
      </div>
    </footer>
  );
}
