export default {
  title: 'Components/Accordion',
};

export const SingleOpen = () => `
  <div style="max-width: 560px;">
    <n-accordion-group model-value="0">
      <n-accordion accordion-title="First item">
        <div class="p-4"><p>Content for the first panel.</p></div>
      </n-accordion>
      <n-accordion accordion-title="Second item">
        <div class="p-4"><p>Content for the second panel.</p></div>
      </n-accordion>
      <n-accordion accordion-title="Third item">
        <div class="p-4"><p>Content for the third panel.</p></div>
      </n-accordion>
    </n-accordion-group>
  </div>
`;

export const WithDividers = () => `
  <div style="max-width: 560px;">
    <n-accordion-group model-value="0">
      <n-accordion accordion-title="First" has-divider>
        <div class="p-4"><p>With divider below header row.</p></div>
      </n-accordion>
      <n-accordion accordion-title="Second" has-divider>
        <div class="p-4"><p>Second panel.</p></div>
      </n-accordion>
      <n-accordion accordion-title="Third">
        <div class="p-4"><p>Last panel.</p></div>
      </n-accordion>
    </n-accordion-group>
  </div>
`;
