
export function findPage(business, url) {
    // Page check
    let thisPage
    let isTopLevelPage = business.interiorPages.find((p) => p.path === url)
    if (!isTopLevelPage) {
        const pagesWithSubPages = business.interiorPages.filter((p) => p.subPages)
        const pageImLookingFor = url;
        for (const pageWithSubPage of pagesWithSubPages) {
            const children = pageWithSubPage.subPages
            for (const child of children) {
                if (child.path === pageImLookingFor) {
                    thisPage = child
                }
            }
        }
    } else {
        thisPage = isTopLevelPage
    }

    return thisPage
}

export function formatDate(date) {
    return new Date(date).toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

export const fetchMarkdownPosts = async () => {
    // grabbing mds from our lib folder
    const blogPostsPath = '/src/lib/blogposts/'
    const blogMarkdownFiles = import.meta.glob('/src/lib/blogposts/*.md');
    const files = Object.entries(blogMarkdownFiles);

    const posts = await Promise.all(
        files.map(async ([ postpath, resolver ]) => {
            const { metadata: postData } = await resolver();
            const path = postpath.split(blogPostsPath)[ 1 ];

            return {
                postData,
                path
            };
        })
    );
    // most recent to least recent
    return posts.sort((a, b) => Date.parse(b.postData.date) - Date.parse(a.postData.date))
};

export const fetchNewsMarkdownPosts = async (limit) => {
    console.log('util:', limit)
    // grabbing mds from our lib folder
    const newsPostsPath = '/src/lib/newsposts/'
    const newsMarkdownFiles = import.meta.glob('/src/lib/newsposts/*.md');
    const files = Object.entries(newsMarkdownFiles);

    const posts = await Promise.all(
        files.map(async ([ postpath, resolver ]) => {
            const data = await resolver()
            const { metadata: postData } = data
            const Content = data.default.render()
            const path = postpath.split(newsPostsPath)[ 1 ];

            return {
                postData,
                path,
                Content
            };
        })
    );
    // most recent to least recent
    return posts.sort((a, b) => Date.parse(b.postData.date) - Date.parse(a.postData.date))
};

export function getTodaysDate() {
    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    const year = today.getFullYear()

    return `${ month }-${ day }-${ year }`
}

// verify sizes of files on upload
export function checkFileSize(input) {
    const MAX_SIZE = 4 * 1024 * 1024 // 4MB in bytes
    const label = document.querySelector(`label[for=${ input.name }]`)
    const customFileUpload = label?.querySelector(".custom-file-upload")

    // reset classes
    label?.classList.remove("success", "error")

    const files = Array.from(input.element.files)
    const totalSize = files.reduce((sum, file) => sum + file.size, 0)

    if (totalSize > MAX_SIZE) {
        label?.classList.add("error")

        if (customFileUpload) {
            customFileUpload.textContent = "Maximum file size limit of 4MB reached. Try again."
        }

        return
    }

    const combinedFileNames = files.map((file) => file.name).join(", ")

    label?.classList.add("success")
    if (customFileUpload) {
        customFileUpload.textContent = combinedFileNames || "No files selected."
    }
}

export function noNestedObjects(data) {
    let master = {}

    for (const [ key, value ] of Object.entries(data)) {
        if (typeof value === "object") {
            for (const [ subkey, subvalue ] of Object.entries(value)) {
                if (typeof subvalue === "object") {
                    for (const [ subsubkey, subsubvalue ] of Object.entries(subvalue)) {
                        master[ `${ subkey }${ subsubkey }` ] = subsubvalue
                    }
                } else {
                    master[ `${ key }${ subkey }` ] = subvalue
                }
            }
        } else {
            master[ key ] = value
        }
    }
    return master
}