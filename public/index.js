
import { createIcon } from "../src/utils";

const g = createIcon({ seed: "foo", scale: 4, size: 10, color: "red" })

document.body.appendChild(g);