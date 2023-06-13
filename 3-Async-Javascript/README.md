# Asynchronous JavaScript

_This section provides a brief introduction to working with asynchronous JavaScript. If you feel comfortable with asynchronous JavaScript already please feel free to skip to section 4 [Working with Controllers](../4-Working-with-Controllers/README.md). We do not add any additional code to our integration in this section._

---

### What is Asynchronous?

The most common definition is doing things at the same time. It is important to note that there is the opposite as well, synchronous, which is doing things in order one after another.

JavaScript by default is _synchronous_ this means that everything you execute in JavaScript will happen one at a time. More importantly, if some function takes a while to execute, the entire program will have to wait until that function is complete before the program can continue.

Let's create a basic example (_note: this is not valid JavaScript but can help demonstrate the concept_)

We want to cook some pasta, but we realized that we don't have any pasta sauce for our pasta. So our code might look something like this

```javascript

function getPastaSauce() {
  goToStoreAndBuyPastaSauceAndComeHome();
  /* This function takes about 10 minutes */
}

function cookPasta() {
  /* This function also takes about 7 minutes */
}

function createPasta() {
  const pasta = cookPasta();
  const sauce = getPastaSauce();
  return addPastaSauce(pasta, sauce);
}

createPasta();
```

In traditional _synchronous_ JavaScript our code is going to take ~20 minutes to run because our `createPasta()` function is going to wait until each item is complete to do the next. So we will spend 10 minutes cooking the pasta, then spend 10 minutes getting the pasta sauce. Honestly by that time our pasta might be cold and our dish will be ruined. So how do we solve this?

### Introducing the _Promise_
The core concept of asynchronous JavaScript is the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). A Promise is the return value of anything asynchronous. You can think of it like a promise in real life. Just like real life promises, they can be successful (fulfilled) or failed (rejected). Until you know if the other person (or function) upheld your promise it's just _pending_.

So if our asynchronous function just returns a promise that it might do something, then how do we know when it's done?

### _await_ syntax
The `await` keyword exist in JavaScript for just this reason, because a promise may or may not happen, but we need to know the result before we can move on to the next step of our program, we can tell our program to `await` until the promise (asynchronous operation) is complete so we can get the value.

```javascript
/* This function takes 10 minutes to run and returns with pasta sauce */
function getPastaSauce() {
  goToStoreAndBuyPastaSauceAndComeHome();
}

/* This function instantly returns with a promise that it _should_ have pasta sauce in 10 minutes */
async function getPastaSauce() {
  goToStoreAndBuyPastaSauceAndComeHome();
}

```

### So how do we efficiently make pasta?
What if we sent someone else to the store to deal with our `getPastaSauce()` issue while we cooked the pasta? We know that cooking pasta takes around 7 minutes and the other person will take 10 minutes so we should only have 3 minutes of downtime. Since we want to do everything in parallel, everything will have to be a promise, even our pasta cooking. We will assume that our pasta cooking goes well and that it's done by the time the pasta sauce gets back.

```javascript
async function getPastaSauce() {
  goToStoreAndBuyPastaSauceAndComeHome();
  /* This function takes about 10 minutes */
}

async function cookPasta() {
  /* This function also takes about 7 minutes */
}

async function createPasta() {
  const pastaPromise = cookPasta();
  /* We will wait for our pasta sauce to arrive, but in the mean time our pasta is cooking.*/
  const sauce = await getPastaSauce();
  /* By the time the sauce is back our pasta promise is fulfilled and we can get the pasta */
  const pasta = pastaPromise.then((pasta) => {return pasta;})
  return addPastaSauce(pasta, sauce);
}

await createPasta();
```

This allows us to efficiently cook pasta with the power of asynchronous JavaScript.

### Why do I need to know this?
The reason why asynchonrous JavaScript is important for this training is because our studio application runs in an `<iframe>` in the web browser. Which means that in order to communicate from our integration to the editor the Studio SDK uses the [postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) function. Because this method essentailly establishes a communication chat channel between our integration and the editor, the messages and responses to the messages are "asynchronous" so we will use the `await` keyword quite a bit in our integration to communicate with the editor via the SDK.