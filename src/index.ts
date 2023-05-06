import { useState } from 'react';

type CopyFn = (text: string) => Promise<boolean>;

const useCopyToClipboard = (): [string, CopyFn] => {
	const [copiedText, setCopiedText] = useState<string>('');

	const copyToClipboard: CopyFn = async (text: string) => {
		if (!navigator?.clipboard) {
			console.log('Clipboard is not supported');
			return false;
		}
		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
			return true;
		} catch (error) {
			console.log('failed to copy', error);
			setCopiedText('');
			return false;
		}
	};

	return [copiedText, copyToClipboard];
};

export default useCopyToClipboard;
