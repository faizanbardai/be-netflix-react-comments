const { readFile, writeFile } = require("fs-extra");

const getAllComments = async filePath => {
  const buffer = await readFile(filePath);
  const fileContent = buffer.toString();
  return JSON.parse(fileContent);
};

const writeComment = async (filePath, newComment) => {
  const allComments = await getAllComments(filePath);
  allComments.push(newComment);
  await writeFile(filePath, JSON.stringify(allComments));
};

const deleteComment = async (filePath, commentToDelete) => {
  const allComments = await getAllComments(filePath);
  const deletedComment = allComments.find(
    comment => comment._id === commentToDelete
  );
  const commentsToKeep = allComments.filter(
    comment => comment._id !== commentToDelete
  );
  if (commentsToKeep.length < allComments.length) {
    await writeFile(filePath, JSON.stringify(commentsToKeep));
    return deletedComment;
  } else {
    return false;
  }
};

module.exports = {
  getAllComments,
  writeComment,
  deleteComment
};
