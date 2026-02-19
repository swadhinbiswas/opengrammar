export function extractText(element: HTMLElement): string {
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    return (element as HTMLInputElement | HTMLTextAreaElement).value;
  }
  if (element.isContentEditable) {
    return element.innerText;
  }
  return '';
}
