LÖSUNGEN - Funktionale Programmierung (HOF 2)
==============================================

Aufgabe 1 - Generator wiederholen (round robin):
-------------------------------------------------
def city_generator() -> Iterator[str]:
    yield "Zürich"
    yield "Bern"
    yield "Luzern"
    yield "Basel"

def round_robin(g: Callable[[], Iterable[T]]) -> Iterator[T]:
    while True:
        for item in g():
            yield item


Aufgabe 2 - Geheimnisträger (Closures):
----------------------------------------
def create_secret_keeper(secret_message: str, correct_password: str) -> Callable[[str], str]:
    def keeper(input_password: str) -> str:
        return secret_message if input_password == correct_password else ACCESS_DENIED
    return keeper


Aufgabe 3 - range_checker_factory:
-----------------------------------
def range_checker_factory(min_value: float, max_value: float) -> Callable[[float], bool]:
    return lambda x: (min_value < x < max_value)
