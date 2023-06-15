package codesquad.secondhand.repository;

import codesquad.secondhand.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
