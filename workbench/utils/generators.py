import os


# refinement_folder = os.path.abspath(os.path.join(os.path.dirname(
#     os.path.realpath(__file__)), "../../report/final"))


def yield_final_ideas(dir):

    dir = os.path.join(dir, "final")

    sections = os.listdir(dir)

    for section in sorted(sections):
        section_fp = os.path.join(dir, section)
        # skip if not a directory
        if not os.path.isdir(section_fp):
            continue
        print()
        print("SECTION:", section)
        ideas = os.listdir(section_fp)
        for idea in sorted(ideas):
            # skip complete.md
            if idea == "complete.md":
                continue
            print('idea:', idea)
            idea_fp = os.path.join(section_fp, idea)
            with open(idea_fp) as f:
                idea_text = f.read()
            yield idea, idea_text, idea_fp
