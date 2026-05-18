// Mounts the home-screen widget UI kit — three iOS frames showing widget states.

function WidgetKit() {
  return (
    <div className="kit-canvas">
      <div className="kit-head">
        <h1>Home-screen widget<em>.</em></h1>
        <p>
          The OS widget sits on the phone's main home screen, next to weather and apps.
          Glanceable list, tap a row to edit, tap + to add. Three states below.
        </p>
      </div>

      <div className="frames">
        <Frame caption="Today" hint="Default tile on the home screen.">
          <HomeScreen initial="today" />
        </Frame>
        <Frame caption="Quick-add" hint="Inline composer expands the tile.">
          <HomeScreen initial="add" />
        </Frame>
        <Frame caption="Edit task" hint="Popover anchored over the widget.">
          <HomeScreen initial="edit" />
        </Frame>
      </div>
    </div>
  );
}

function Frame({ caption, hint, children }) {
  return (
    <div className="frame-wrap">
      <IOSDevice width={360} height={760}>
        {children}
      </IOSDevice>
      <div className="caption">
        {caption}
        <em>{hint}</em>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<WidgetKit />);
