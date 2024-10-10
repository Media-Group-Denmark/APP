import React from 'react';

export default function LoadShowHeroes() {
  return (
    <aside>
      <div id="viralizeContainer"></div>
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <script
              src="https://content.viralize.tv/display/?zid=AAFp6TIrtjcx6N9Y"
              data-wid="viralizeContainer"
              type="text/javascript"
            ></script>
          `,
        }}
      />
    </aside>
  );
}
