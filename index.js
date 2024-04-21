import screenshot from "screenshot-desktop";
import { getInput, setFailed } from "@actions/core";
import { create } from "@actions/artifact";

const fileName = getInput("file-name");

const artifactClient = create();

async function uploadScreenshot() {
	await screenshot({ filename: fileName });
	await artifactClient.uploadArtifact(fileName, [fileName], ".");
}

uploadScreenshot().catch((error) => {
	setFailed(error.message);
});
